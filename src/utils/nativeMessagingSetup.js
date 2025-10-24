import child_process from 'child_process'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'

import { logger } from './logger'
import { META_URL } from '../constants/meta'

const MANIFEST_NAME = 'com.noxtton.pearpass'

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, res) => (err ? reject(err) : resolve(res)))
    })
const execAsync = promisify(child_process.exec)

/**
 * Returns platform-specific paths and file names for the native host executable
 * @returns {{ platform: string, executableFileName: string, executablePath: string, sourceExecutableName: string, executablesUrlPath: string }}
 */
export const getNativeHostExecutableInfo = () => {
  const platform = os.platform()
  let sourceExecutableName, executableFileName

  switch (platform) {
    case 'darwin':
      sourceExecutableName = 'index-macos-arm64'
      executableFileName = 'pearpass-native-host'
      break
    case 'win32':
      sourceExecutableName = 'index-win-x64'
      executableFileName = 'pearpass-native-host'
      break
    case 'linux':
      sourceExecutableName = 'index-linux-x64'
      executableFileName = 'pearpass-native-host'
      break
    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }

  const storageDir = path.join(Pear.config.storage, 'native-messaging')
  const executablePath = path.join(storageDir, executableFileName)
  const executablesUrlPath = 'appling/assets/native-messaging-bridge' // Directory where executables are stored

  return {
    platform,
    executableFileName,
    executablePath,
    sourceExecutableName,
    executablesUrlPath
  }
}

/**
 * Returns platform-specific manifest file paths and (on Windows) registry keys
 * @returns {{ platform: string, manifestPaths: string[], registryKeys: string[] }}
 */
export const getNativeMessagingLocations = () => {
  const platform = os.platform()
  const home = os.homedir()
  const manifestFile = `${MANIFEST_NAME}.json`
  let manifestPaths = []
  let registryKeys = []

  switch (platform) {
    case 'darwin':
      manifestPaths = [
        path.join(
          home,
          'Library',
          'Application Support',
          'Google',
          'Chrome',
          'NativeMessagingHosts',
          manifestFile
        ),
        path.join(
          home,
          'Library',
          'Application Support',
          'Microsoft Edge',
          'NativeMessagingHosts',
          manifestFile
        )
      ]
      break

    case 'win32':
      manifestPaths = [
        path.join(
          home,
          'AppData',
          'Local',
          'PearPass',
          'NativeMessaging',
          manifestFile
        )
      ]
      registryKeys = [
        `HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\${MANIFEST_NAME}`,
        `HKCU\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\${MANIFEST_NAME}`
      ]
      break

    case 'linux':
      manifestPaths = [
        path.join(
          home,
          '.config',
          'google-chrome',
          'NativeMessagingHosts',
          manifestFile
        ),
        path.join(
          home,
          '.config',
          'chromium',
          'NativeMessagingHosts',
          manifestFile
        ),
        path.join(
          home,
          '.config',
          'microsoft-edge',
          'NativeMessagingHosts',
          manifestFile
        )
      ]
      break

    default:
      throw new Error(`Unsupported platform: ${platform}`)
  }

  return { platform, manifestPaths, registryKeys }
}

/**
 * Removes native messaging manifest files and registry entries
 * This prevents the browser from respawning the host when integration is disabled.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const cleanupNativeMessaging = async () => {
  try {
    const { platform, manifestPaths, registryKeys } =
      getNativeMessagingLocations()

    let removedCount = 0

    // Remove manifest files
    for (const manifestPath of manifestPaths) {
      try {
        await fs.unlink(manifestPath)
        removedCount++
        logger.info(
          'NATIVE-MESSAGING-CLEANUP',
          `Removed manifest file: ${manifestPath}`
        )
      } catch (err) {
        // File might not exist, which is fine
        if (err.code !== 'ENOENT') {
          logger.error(
            'NATIVE-MESSAGING-CLEANUP',
            `Failed to remove manifest at ${manifestPath}: ${err.message}`
          )
        }
      }
    }

    // Windows Registry Cleanup
    if (platform === 'win32') {
      for (const key of registryKeys) {
        const cmd = `reg delete "${key}" /f`
        try {
          await execAsync(cmd)
          logger.info(
            'NATIVE-MESSAGING-CLEANUP',
            `Removed registry key: ${key}`
          )
        } catch (err) {
          // Registry key might not exist, which is fine
          logger.error(
            'NATIVE-MESSAGING-CLEANUP',
            `Failed to remove registry key '${key}': ${err.message}`
          )
        }
      }
    }

    const message =
      removedCount > 0
        ? `Native messaging cleanup completed. Removed ${removedCount} manifest file(s).`
        : 'No native messaging manifest files found to remove.'

    return {
      success: true,
      message
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to cleanup native messaging: ${error.message}`
    }
  }
}

/**
 * Kills running native messaging host processes so the browser can respawn them
 * and re-read the manifest with the updated allowed_origins.
 * Safe to call on macOS/Linux/Windows; no-op if process is not found.
 * @returns {Promise<void>}
 */
export const killNativeMessagingHostProcesses = async () => {
  try {
    const { platform, executableFileName } = getNativeHostExecutableInfo()

    if (platform === 'win32') {
      // Windows: Kill by executable name
      try {
        const cmd = `taskkill /F /IM "${executableFileName}" 2>nul || echo No process found`
        await execAsync(cmd)
        logger.info(
          'NATIVE-MESSAGING-KILL',
          'Windows: Killed native messaging host processes'
        )
      } catch (error) {
        // Process might not exist, which is fine
        logger.info(
          'NATIVE-MESSAGING-KILL',
          `Windows: No native messaging processes found to kill: ${error.message}`
        )
      }
    } else {
      // macOS/Linux: Kill by executable name
      try {
        await execAsync(`pkill -f "${executableFileName}"`)
        logger.info(
          'NATIVE-MESSAGING-KILL',
          'Killed native messaging host process by name'
        )
      } catch (error) {
        // Process might not be running, which is fine
        logger.info(
          'NATIVE-MESSAGING-KILL',
          'No native messaging host process found to kill'
        )
      }
    }
  } catch (error) {
    logger.error(
      'NATIVE-MESSAGING-KILL',
      `Failed to kill host processes: ${error.message}`
    )
  }
}

/**
 * Sets up native messaging for a given extension ID
 * @param {string} extensionId - The Chrome extension ID
 * @returns {Promise<{success: boolean, message: string, extensionId?: string, manifestPath?: string}>}
 */
export const setupNativeMessaging = async (extensionId) => {
  try {
    // Determine platform-specific executable path and names
    const {
      platform,
      executablePath,
      sourceExecutableName,
      executablesUrlPath
    } = getNativeHostExecutableInfo()

    // Ensure directory for executable exists
    await fs.mkdir(path.dirname(executablePath), { recursive: true })

    // Fetch the pre-compiled executable for this platform
    try {
      const currentModuleUrl = new URL(META_URL)

      // Construct URL for the platform-specific executable
      const executableUrl = new URL(
        `${executablesUrlPath}/${sourceExecutableName}`,
        currentModuleUrl.origin
      ).href

      logger.info(
        'NATIVE-MESSAGING-SETUP',
        `Fetching native messaging executable from: ${executableUrl}`
      )

      const executableResponse = await fetch(executableUrl)
      if (!executableResponse.ok) {
        throw new Error(
          `Failed to fetch executable: ${executableResponse.status} ${executableResponse.statusText}`
        )
      }

      logger.info(
        'NATIVE-MESSAGING-SETUP',
        'Downloading and installing executable...'
      )

      const executableBuffer = await executableResponse.arrayBuffer()
      await fs.writeFile(executablePath, Buffer.from(executableBuffer))

      // Set executable permissions on Unix systems
      if (platform !== 'win32') {
        await fs.chmod(executablePath, 0o755)
      }

      logger.info(
        'NATIVE-MESSAGING-SETUP',
        `Native messaging executable installed successfully at: ${executablePath}`
      )
    } catch (err) {
      throw new Error(
        `Failed to install native messaging executable: ${err.message}`
      )
    }

    // Create native messaging manifest
    const manifest = {
      name: MANIFEST_NAME,
      description: 'PearPass Native Messaging Host',
      path: executablePath,
      type: 'stdio',
      allowed_origins: [`chrome-extension://${extensionId}/`]
    }

    // Get manifest paths (and registry keys on Windows)
    const { manifestPaths, registryKeys } = getNativeMessagingLocations()

    // Write manifest to all relevant paths
    for (const manifestPath of manifestPaths) {
      try {
        await fs.mkdir(path.dirname(manifestPath), { recursive: true })
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))

        if (platform !== 'win32') {
          await fs.chmod(manifestPath, 0o644)
        }
      } catch (err) {
        logger.error(
          'NATIVE-MESSAGING-SETUP',
          `Failed to write manifest at ${manifestPath}: ${err.message}`
        )
      }
    }

    // Windows Registry Setup
    if (platform === 'win32') {
      const manifestPath = manifestPaths[0]
      for (const key of registryKeys) {
        const cmd = `reg add "${key}" /ve /d "${manifestPath}" /f`
        try {
          await execAsync(cmd)
        } catch (err) {
          logger.error(
            'NATIVE-MESSAGING-SETUP',
            `Failed to write registry key '${key}': ${err.message}`
          )
        }
      }
    }

    return {
      success: true,
      message: 'Native messaging host installed successfully',
      extensionId,
      manifestPath: manifestPaths.join(', ')
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to setup native messaging: ${error.message}`
    }
  }
}
