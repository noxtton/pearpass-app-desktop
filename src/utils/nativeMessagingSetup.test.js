import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import { setupNativeMessaging } from './nativeMessagingSetup'

// Mock dependencies
jest.mock('os')
jest.mock('fs/promises')
jest.mock('path')
jest.mock('./logger', () => ({
  logger: {
    log: jest.fn()
  }
}))
jest.mock('../constants/meta', () => ({
  META_URL: 'http://mock.meta.url'
}))

// Mock Pear global
global.Pear = {
  config: {
    storage: '/mock/storage'
  }
}

// Helper to reset mocks
const resetMocks = () => {
  jest.clearAllMocks()
  os.platform.mockReturnValue('linux')
  os.homedir.mockReturnValue('/home/testuser')
  path.join.mockImplementation((...args) => args.join('/'))
  fs.mkdir.mockResolvedValue()
  fs.writeFile.mockResolvedValue()
  fs.chmod.mockResolvedValue()
}

describe('setupNativeMessaging', () => {
  beforeEach(resetMocks)

  it('should succeed on linux and write manifest files', async () => {
    const result = await setupNativeMessaging('test-extension-id')
    expect(result.success).toBe(true)
    expect(result.extensionId).toBe('test-extension-id')
    expect(result.message).toMatch(
      /Native messaging host installed successfully/
    )
    expect(fs.mkdir).toHaveBeenCalled()
    expect(fs.writeFile).toHaveBeenCalled()
    expect(fs.chmod).toHaveBeenCalled()
  })

  it('should handle unsupported platforms', async () => {
    os.platform.mockReturnValue('unknown')
    const result = await setupNativeMessaging('test-extension-id')
    expect(result.success).toBe(false)
    expect(result.message).toMatch(/Unsupported platform/)
  })

  it('should handle manifest write errors gracefully', async () => {
    fs.writeFile.mockRejectedValueOnce(new Error('write failed'))
    const result = await setupNativeMessaging('test-extension-id')
    expect(result.success).toBe(false)
    expect(result.message).toMatch(/Failed to setup native messaging/)
  })

  it('should handle script creation errors', async () => {
    // Simulate error in script creation
    fs.writeFile.mockRejectedValueOnce(new Error('script write failed'))
    const result = await setupNativeMessaging('test-extension-id')
    expect(result.success).toBe(false)
    expect(result.message).toMatch(/Failed to setup native messaging/)
  })

  it('should setup registry keys on win32', async () => {
    os.platform.mockReturnValue('win32')
    os.homedir.mockReturnValue('C:/Users/testuser')
    const execAsyncMock = jest.fn().mockResolvedValue()
    // Patch execAsync in module scope
    jest
      .spyOn(require('child_process'), 'exec')
      .mockImplementation((cmd, cb) => cb(null, ''))
    // Patch promisify to use our execAsyncMock
    require('./nativeMessagingSetup').execAsync = execAsyncMock

    const result = await setupNativeMessaging('test-extension-id')
    expect(result.success).toBe(true)
    expect(result.message).toMatch(
      /Native messaging host installed successfully/
    )
  })
})
