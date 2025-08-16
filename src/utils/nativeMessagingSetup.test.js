import child_process from 'child_process'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import { setupNativeMessaging } from './nativeMessagingSetup'

// Mock dependencies
jest.mock('child_process', () => ({
  exec: jest.fn((command, callback) => callback(null, 'stdout'))
}))
jest.mock('fs/promises', () => ({
  mkdir: jest.fn(() => Promise.resolve()),
  writeFile: jest.fn(() => Promise.resolve()),
  chmod: jest.fn(() => Promise.resolve())
}))
jest.mock('os', () => ({
  platform: jest.fn(),
  homedir: jest.fn()
}))

const MANIFEST_NAME = 'com.pearpass.vault'

describe('setupNativeMessaging', () => {
  const extensionId = 'test-extension-id'
  const executablePath = '/path/to/executable'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const testPlatform = async ({
    platform,
    homeDir,
    expectedPaths,
    shouldCallChmod,
    shouldCallExec
  }) => {
    os.platform.mockReturnValue(platform)
    os.homedir.mockReturnValue(homeDir)

    const result = await setupNativeMessaging(extensionId, executablePath)

    expect(result.success).toBe(true)
    expect(result.extensionId).toBe(extensionId)

    const manifest = {
      name: MANIFEST_NAME,
      description: 'PearPass Native Messaging Host',
      path: executablePath,
      type: 'stdio',
      allowed_origins: [`chrome-extension://${extensionId}/`]
    }
    const manifestJSON = JSON.stringify(manifest, null, 2)

    for (const expectedPath of expectedPaths) {
      expect(fs.mkdir).toHaveBeenCalledWith(path.dirname(expectedPath), {
        recursive: true
      })
      expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, manifestJSON)
      if (shouldCallChmod) {
        expect(fs.chmod).toHaveBeenCalledWith(expectedPath, 0o644)
        expect(fs.chmod).toHaveBeenCalledWith(executablePath, 0o755)
      }
    }

    if (shouldCallChmod) {
      expect(fs.chmod).toHaveBeenCalledTimes(expectedPaths.length * 2)
    } else {
      expect(fs.chmod).not.toHaveBeenCalled()
    }

    if (shouldCallExec) {
      expect(child_process.exec).toHaveBeenCalledTimes(2)
      const manifestPath = expectedPaths[0]
      expect(child_process.exec).toHaveBeenCalledWith(
        `reg add "HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\${MANIFEST_NAME}" /ve /d "${manifestPath}" /f`,
        expect.any(Function)
      )
      expect(child_process.exec).toHaveBeenCalledWith(
        `reg add "HKCU\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\${MANIFEST_NAME}" /ve /d "${manifestPath}" /f`,
        expect.any(Function)
      )
    } else {
      expect(child_process.exec).not.toHaveBeenCalled()
    }
  }

  describe('on darwin', () => {
    it('should correctly setup native messaging for Chrome and Edge', async () => {
      const homeDir = '/Users/testuser'
      const manifestFile = `${MANIFEST_NAME}.json`
      await testPlatform({
        platform: 'darwin',
        homeDir,
        expectedPaths: [
          path.join(
            homeDir,
            'Library/Application Support/Google/Chrome/NativeMessagingHosts',
            manifestFile
          ),
          path.join(
            homeDir,
            'Library/Application Support/Microsoft Edge/NativeMessagingHosts',
            manifestFile
          )
        ],
        shouldCallChmod: true,
        shouldCallExec: false
      })
    })
  })

  describe('on linux', () => {
    it('should correctly setup native messaging for Chrome, Chromium, and Edge', async () => {
      const homeDir = '/home/testuser'
      const manifestFile = `${MANIFEST_NAME}.json`
      await testPlatform({
        platform: 'linux',
        homeDir,
        expectedPaths: [
          path.join(
            homeDir,
            '.config/google-chrome/NativeMessagingHosts',
            manifestFile
          ),
          path.join(
            homeDir,
            '.config/chromium/NativeMessagingHosts',
            manifestFile
          ),
          path.join(
            homeDir,
            '.config/microsoft-edge/NativeMessagingHosts',
            manifestFile
          )
        ],
        shouldCallChmod: true,
        shouldCallExec: false
      })
    })
  })

  describe('on win32', () => {
    it('should correctly setup native messaging and registry keys', async () => {
      const homeDir = 'C:\\Users\\testuser'
      const manifestFile = `${MANIFEST_NAME}.json`
      await testPlatform({
        platform: 'win32',
        homeDir,
        expectedPaths: [
          path.join(
            homeDir,
            'AppData/Local/PearPass/NativeMessaging',
            manifestFile
          )
        ],
        shouldCallChmod: false,
        shouldCallExec: true
      })
    })
  })

  it('should return failure on unsupported platform', async () => {
    os.platform.mockReturnValue('sunos') // An unsupported OS
    os.homedir.mockReturnValue('/home/testuser')

    const result = await setupNativeMessaging(extensionId, executablePath)

    expect(result.success).toBe(false)
    expect(result.message).toBe(
      'Failed to setup native messaging: Unsupported platform: sunos'
    )
    expect(fs.writeFile).not.toHaveBeenCalled()
    expect(child_process.exec).not.toHaveBeenCalled()
  })

  it('should return failure if fs.mkdir throws an error', async () => {
    const error = new Error('Permission denied')
    fs.mkdir.mockRejectedValue(error)
    os.platform.mockReturnValue('linux')
    os.homedir.mockReturnValue('/home/testuser')

    // We expect console.warn to be called, but the overall result should be success
    const consoleWarnSpy = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    const result = await setupNativeMessaging(extensionId, executablePath)

    expect(result.success).toBe(true)
    expect(consoleWarnSpy).toHaveBeenCalled()
    consoleWarnSpy.mockRestore()
  })

  it('should return failure if top-level operation fails', async () => {
    const error = new Error('Unexpected error')
    os.platform.mockImplementation(() => {
      throw error
    })

    const result = await setupNativeMessaging(extensionId, executablePath)
    expect(result.success).toBe(false)
    expect(result.message).toBe(
      `Failed to setup native messaging: ${error.message}`
    )
  })
})
