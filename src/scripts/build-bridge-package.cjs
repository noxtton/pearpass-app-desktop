#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const SOURCE_DIR = path.join(__dirname, '..', 'native-messaging-bridge')
const OUTPUT_DIR = 'native-messaging-bridge-dist'

console.log('Building native messaging bridge package...')

// Step 1: Clean output directory
console.log('Step 1: Cleaning output directory...')
if (fs.existsSync(OUTPUT_DIR)) {
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true })
}
fs.mkdirSync(OUTPUT_DIR, { recursive: true })

// Step 2: Copy the entire module including node_modules
console.log('Step 2: Copying bridge module...')
fs.cpSync(SOURCE_DIR, OUTPUT_DIR, { 
  recursive: true,
  filter: (src) => {
    const basename = path.basename(src)
    return basename !== '.git' && basename !== '.DS_Store'
  }
})

// Step 3: Create a tar.gz archive for easy distribution
console.log('Step 3: Creating archive...')
try {
  execSync(`tar -czf ${OUTPUT_DIR}.tar.gz -C ${OUTPUT_DIR} .`, { stdio: 'inherit' })
  console.log(`Created archive: ${OUTPUT_DIR}.tar.gz`)
} catch (err) {
  console.warn('Failed to create tar archive:', err.message)
}

// Step 4: Create a manifest file that lists all files (for production fetching)
console.log('Step 4: Creating file manifest...')
const manifest = {
  version: '1.0.0',
  files: []
}

function addToManifest(dir, basePath = '') {
  const items = fs.readdirSync(dir)
  
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const relativePath = path.join(basePath, item)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      addToManifest(fullPath, relativePath)
    } else {
      manifest.files.push({
        path: relativePath.replace(/\\/g, '/'), // Normalize path separators
        size: stat.size
      })
    }
  }
}

addToManifest(OUTPUT_DIR)
fs.writeFileSync(path.join(OUTPUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))

console.log('\nBuild complete!')
console.log(`Output directory: ${OUTPUT_DIR}`)
console.log(`Archive: ${OUTPUT_DIR}.tar.gz`)
console.log(`Total files: ${manifest.files.length}`)
