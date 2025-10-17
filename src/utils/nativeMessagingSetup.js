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
 * @returns {{ platform: string, scriptsDir: string, executableFileName: string, executablePath: string, wrapperFileName: string }}
 */
export const getNativeHostExecutableInfo = () => {
  const platform = os.platform()
  const executablePathExtension = platform === 'win32' ? '.bat' : ''
  const executableFileName = `pearpass-native-host-executable${executablePathExtension}`
  const wrapperFileName = 'pearpass-native-host-wrapper.js'
  const scriptsDir = path.join(Pear.config.storage, 'native-messaging')
  const executablePath = path.join(scriptsDir, executableFileName)
  return {
    platform,
    scriptsDir,
    executableFileName,
    executablePath,
    wrapperFileName
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
    const { platform, executablePath, wrapperFileName } =
      getNativeHostExecutableInfo()

    if (platform === 'win32') {
      // Windows: Kill by command line pattern using wmic
      // The pattern 'pearpass-native-host' catches both the batch file and Node.js wrapper process
      try {
        const cmd = `wmic process where "CommandLine like '%pearpass-native-host%'" call terminate`
        await execAsync(cmd)
        logger.info('NATIVE-MESSAGING-KILL', 'Windows: Killed native messaging host processes via wmic')
      } catch (error) {
        // Process might not exist, which is fine
        logger.info('NATIVE-MESSAGING-KILL', `Windows: No native messaging processes found to kill: ${error.message}`)
      }
    } else {
      // macOS/Linux: Use process title which works reliably on these platforms
      try {
        await execAsync('pkill -f "pearpass-native-messaging-host"')
        logger.info(
          'NATIVE-MESSAGING-KILL',
          'Killed native messaging host process by title'
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
    const { platform, scriptsDir, executablePath, wrapperFileName } =
      getNativeHostExecutableInfo()
    const bridgeFileName = 'extension-to-ipc-bridge.cjs'

    path.join(scriptsDir, bridgeFileName)
    const wrapperPath = path.join(scriptsDir, wrapperFileName)
    path.join(scriptsDir, 'node_modules')
    // Ensure directory for executable exists
    await fs.mkdir(path.dirname(executablePath), { recursive: true })

    // Fetch and extract the bridge module if available
    try {
      const currentModuleUrl = new URL(META_URL)

      // Download and extract if the bridge archive exists
      const bridgeArchiveUrl = new URL(
        'native-messaging-bridge.tar.gz',
        currentModuleUrl.origin
      ).href
      logger.info(
        'NATIVE-MESSAGING-SETUP',
        `Fetching bridge module archive from: ${bridgeArchiveUrl}`
      )
      try {
        const archiveResponse = await fetch(bridgeArchiveUrl)
        if (archiveResponse.ok) {
          logger.info(
            'NATIVE-MESSAGING-SETUP',
            'Extracting bridge module from archive...'
          )
          const archiveBuffer = await archiveResponse.arrayBuffer()
          const tarPath = path.join(scriptsDir, 'bridge.tar.gz')
          await fs.writeFile(tarPath, Buffer.from(archiveBuffer))

          // Extract the archive
          if (platform === 'win32') {
            // Windows: Use PowerShell commands that work reliably
            await execAsync(
              `powershell -Command "cd '${scriptsDir}'; tar -xzf bridge.tar.gz; Remove-Item bridge.tar.gz"`
            )
          } else {
            // Unix: Use standard shell commands
            await execAsync(
              `cd "${scriptsDir}" && tar -xzf bridge.tar.gz && rm bridge.tar.gz`
            )
          }
          logger.info(
            'NATIVE-MESSAGING-SETUP',
            'Bridge module extracted successfully'
          )
        }
      } catch {
        logger.error(
          'NATIVE-MESSAGING-SETUP',
          'Bridge module archive not found, continuing without it'
        )
      }

      // Copy dependencies and set up environment
      logger.info('NATIVE-MESSAGING-SETUP', 'Creating wrapper script...')

      // Create wrapper script that sets up module paths
      const wrapperScriptContent = `#!/usr/bin/env node
// Native messaging host wrapper
// This script sets up the module paths and runs the actual bridge script

const path = require('path')
const fs = require('fs')

// Set process title for easier identification
process.title = 'pearpass-native-messaging-host'

// Set script directory as working directory
process.chdir(__dirname)

const localNodeModules = path.join(__dirname, 'node_modules')
if (fs.existsSync(localNodeModules)) {
  // Use local node_modules if available (production with extracted dependencies)
  module.paths.unshift(localNodeModules)
}

// Run the actual bridge script
if (fs.existsSync(path.join(__dirname, 'index.js'))) {
  // Production: run the extracted module
  require('./index.js')
} else {
  console.error('Native messaging bridge module not found!')
  process.exit(1)
}
`

      await fs.writeFile(wrapperPath, wrapperScriptContent, { mode: 0o755 })

      // 3. Create platform-specific executable that runs the wrapper
      let executableContent
      if (platform === 'win32') {
        // Windows batch file
        executableContent = `@echo off\nnode "%~dp0${wrapperFileName}" %*`
      } else {
        // Unix shell script with NVM support and polyglot shebang
        // This allows the script to work as both a shell script and a Node.js script
        executableContent = `#!/bin/sh
':' //; export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"; exec node "$0" "$@"


// Get the directory where this script is located
const path = require('path')
const scriptDir = __dirname

// Execute the wrapper script
require(path.join(scriptDir, '${wrapperFileName}'))
`
      }

      // Write executable with proper permissions
      await fs.writeFile(executablePath, executableContent, { mode: 0o755 })
    } catch (err) {
      throw new Error(
        `Failed to create script files in temp directory: ${err.message}`
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
