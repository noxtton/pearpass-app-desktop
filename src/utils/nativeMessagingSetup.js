import child_process from 'child_process'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'

const MANIFEST_NAME = 'com.pearpass.vault'

const promisify =
  (fn) =>
  (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, res) => (err ? reject(err) : resolve(res)))
    })
const execAsync = promisify(child_process.exec)

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
    const platform = os.platform()
    const home = os.homedir()
    const manifestFile = `${MANIFEST_NAME}.json`
    let manifestPaths = []

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
        const localPath = path.join(
          home,
          'AppData',
          'Local',
          'PearPass',
          'NativeMessaging',
          manifestFile
        )
        manifestPaths = [localPath]
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

    // Write manifest to all relevant paths
    for (const manifestPath of manifestPaths) {
      try {
        await fs.mkdir(path.dirname(manifestPath), { recursive: true })
        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))

        if (platform !== 'win32') {
          await fs.chmod(manifestPath, 0o644)
          await fs.chmod(executablePath, 0o755)
        }
      } catch (err) {
        console.warn(
          `Failed to write manifest at ${manifestPath}: ${err.message}`
        )
      }
    }

    // Windows Registry Setup
    if (platform === 'win32') {
      const regCommands = [
        `reg add "HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\${MANIFEST_NAME}" /ve /d "${manifestPaths[0]}" /f`,
        `reg add "HKCU\\Software\\Microsoft\\Edge\\NativeMessagingHosts\\${MANIFEST_NAME}" /ve /d "${manifestPaths[0]}" /f`
      ]

      for (const cmd of regCommands) {
        try {
          await execAsync(cmd)
        } catch (err) {
          console.warn(
            `Failed to write registry key with command '${cmd}': ${err.message}`
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
