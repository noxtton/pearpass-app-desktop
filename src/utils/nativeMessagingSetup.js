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
 * @returns {Promise<{success: boolean, message: string, extensionId?: string, manifestPath?: string}>}
 */
export async function setupNativeMessaging(extensionId) {
  try {
    // Create executable path based on platform
    const platform = os.platform()
    const executablePathExtension = platform === 'win32' ? '.bat' : ''
    const executableFileName = `pearpass-native-host-executable${executablePathExtension}`
    const bridgeFileName = 'extension-to-ipc-bridge.cjs'
    const wrapperFileName = 'pearpass-native-host-wrapper.js'
    
    // Destination paths
    const scriptsDir = path.join(Pear.config.storage, 'native-messaging')
    const executablePath = path.join(scriptsDir, executableFileName)
    const bridgeFilePath = path.join(scriptsDir, bridgeFileName)
    const wrapperPath = path.join(scriptsDir, wrapperFileName)
    const nodeModulesDir = path.join(scriptsDir, 'node_modules')
    
    // Ensure the destination directory exists
    await fs.mkdir(path.dirname(executablePath), { recursive: true })
    
    // Read and extract the bridge module to temp directory
    try {
      const currentModuleUrl = new URL(import.meta.url)

      // 1. Try to fetch the bridge module archive
      const bridgeArchiveUrl = new URL('native-messaging-bridge-dist.tar.gz', currentModuleUrl.origin).href
      console.log('Fetching bridge module archive from:', bridgeArchiveUrl)
      
      let useArchive = false
      try {
        const archiveResponse = await fetch(bridgeArchiveUrl)
        if (archiveResponse.ok) {
          console.log('Extracting bridge module from archive...')
          const archiveBuffer = await archiveResponse.arrayBuffer()
          const tarPath = path.join(scriptsDir, 'bridge.tar.gz')
          await fs.writeFile(tarPath, Buffer.from(archiveBuffer))
          
          // Extract the archive
          await execAsync(`cd "${scriptsDir}" && tar -xzf bridge.tar.gz && rm bridge.tar.gz`)
          useArchive = true
          console.log('Bridge module extracted successfully')
        }
      } catch (archiveErr) {
        console.log('Bridge module archive not found, continuing without it')
      }
      
      // 2. Copy pear-ipc and its dependencies to temp directory
      // In production, we'll need to include these as part of the bundle
      // For now, we'll create a wrapper that adds the node_modules path
      console.log('Creating wrapper script...')
      
      // Create wrapper script that sets up module paths
      const wrapperScriptContent = `#!/usr/bin/env node
// Native messaging host wrapper
// This script sets up the module paths and runs the actual bridge script

const path = require('path')
const fs = require('fs')

// Change to script directory
process.chdir(__dirname)

// Set up module paths
const localNodeModules = path.join(__dirname, 'node_modules')
if (fs.existsSync(localNodeModules)) {
  // Use local node_modules if available (production with extracted dependencies)
  module.paths.unshift(localNodeModules)
} else {
  // Fallback to application's node_modules (development)
  const appNodeModules = path.join(__dirname, '..', '..', '..', 'node_modules')
  if (fs.existsSync(appNodeModules)) {
    module.paths.unshift(appNodeModules)
  }
}

// Run the actual bridge script
// Check if we have the module extracted (production) or use fallback
if (fs.existsSync(path.join(__dirname, 'index.js'))) {
  // Production: run the extracted module
  require('./index.js')
} else {
  // Development: run the bundled script
  require('./extension-to-ipc-bridge.cjs')
}
`
      
      await fs.writeFile(wrapperPath, wrapperScriptContent, { mode: 0o755 })
      

      // 3. Create platform-specific executable that runs the wrapper
      let executableContent
      if (platform === 'win32') {
        executableContent = `@echo off\nnode "%~dp0${wrapperFileName}" %*`
      } else {
        executableContent = `#!/bin/bash\nnode "$(dirname "$0")/${wrapperFileName}" "$@"`
      }
      
      // Write executable with proper permissions
      await fs.writeFile(executablePath, executableContent, { mode: 0o755 })

    } catch (err) {
      throw new Error(`Failed to create script files in temp directory: ${err.message}`)
    }
    
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
