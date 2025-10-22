#!/usr/bin/env node
/* eslint-disable no-console */

import { execSync } from 'child_process'
import { existsSync, rmSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const moduleDirname = dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = join(moduleDirname, '..', 'native-messaging-bridge')
const OUTPUT_DIR = join(SOURCE_DIR, 'dist')
const PROJECT_ROOT = join(moduleDirname, '..', '..')

console.log('Building native messaging bridge executables...')

// Generate executables for all platforms using pkg
try {
  // Clean up old executables
  if (existsSync(OUTPUT_DIR)) {
    console.log('Cleaning up old executables...')
    rmSync(OUTPUT_DIR, { recursive: true, force: true })
  }

  console.log('Installing bridge dependencies...')
  execSync('npm install --production', { cwd: SOURCE_DIR, stdio: 'inherit' })

  console.log('Building executables with pkg...')
  const targets = ['node22-linux-x64', 'node22-macos-arm64', 'node22-win-x64']

  const targetString = targets.join(',')
  const indexPath = join(SOURCE_DIR, 'index.js')

  // Run pkg from project root so it can find the dependency
  execSync(
    `npx pkg "${indexPath}" --compress GZip --targets ${targetString} --out-path "${OUTPUT_DIR}"`,
    {
      cwd: PROJECT_ROOT,
      stdio: 'inherit'
    }
  )

  console.log('\nBuild complete! Generated executables:')
  console.log('  - index-linux (Linux ARM64)')
  console.log('  - index-macos (macOS ARM64)')
  console.log('  - index-win (Windows ARM64)')
  console.log(`\nExecutables saved to: ${OUTPUT_DIR}`)
} catch (err) {
  console.error('Failed to build executables:', err.message)
  process.exit(1)
}
