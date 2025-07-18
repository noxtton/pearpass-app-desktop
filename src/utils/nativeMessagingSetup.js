import fs from 'fs/promises'
import os from 'os'
import path from 'path'

const MANIFEST_NAME = 'com.pearpass.vault'

/**
 * Setup native messaging for a specific extension ID
 * @param {string} extensionId
 * @param {string} executablePath
 * @returns {Promise<{success: boolean, message: string, extensionId?: string, manifestPath?: string}>}
 */
export async function setupNativeMessaging(extensionId, executablePath) {
  try {
    // Create native messaging manifest
    const manifest = {
      name: MANIFEST_NAME,
      description: 'PearPass Native Messaging Host',
      path: executablePath,
      type: 'stdio',
      allowed_origins: [`chrome-extension://${extensionId}/`]
    }

    // Get manifest path
    const home = os.homedir()
    const manifestFile = `${MANIFEST_NAME}.json`
    let manifestPath

    switch (os.platform()) {
      case 'darwin':
        // macOS - Chrome and Edge use same location
        manifestPath = path.join(
          home,
          'Library',
          'Application Support',
          'Google',
          'Chrome',
          'NativeMessagingHosts',
          manifestFile
        )
        break

      case 'win32':
        // Windows
        manifestPath = path.join(
          home,
          'AppData',
          'Local',
          'PearPass',
          'NativeMessaging',
          manifestFile
        )
        break

      case 'linux':
        // Linux
        manifestPath = path.join(
          home,
          '.config',
          'google-chrome',
          'NativeMessagingHosts',
          manifestFile
        )
        break

      default:
        throw new Error(`Unsupported platform: ${os.platform()}`)
    }

    // Ensure directory exists
    await fs.mkdir(path.dirname(manifestPath), { recursive: true })

    // Write manifest
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))

    // Set permissions on Unix-like systems
    if (os.platform() !== 'win32') {
      await fs.chmod(manifestPath, 0o644)
      await fs.chmod(executablePath, 0o755)
    }

    return {
      success: true,
      message: 'Native messaging host installed successfully',
      extensionId,
      manifestPath
    }
  } catch (error) {
    return {
      success: false,
      message: `Failed to setup native messaging: ${error.message}`
    }
  }
}
