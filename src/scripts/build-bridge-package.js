#!/usr/bin/env node

import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = join(__dirname, '..', 'native-messaging-bridge')
const ARCHIVE_NAME = 'native-messaging-bridge.tar.gz'

console.log('Building native messaging bridge package...')

// Create tar.gz archive directly from source directory
try {
  execSync(`tar -czf ${ARCHIVE_NAME} -C ${SOURCE_DIR} .`, { stdio: 'inherit' })
  console.log(`\n✓ Build complete!`)
  console.log(`  Archive: ${ARCHIVE_NAME}`)
} catch (err) {
  console.error('Failed to create archive:', err.message)
  process.exit(1)
}
