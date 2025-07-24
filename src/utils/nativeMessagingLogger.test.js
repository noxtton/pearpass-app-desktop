import fs from 'fs'
import path from 'path'

import { logger } from './logger'
import { log } from './nativeMessagingLogger'

// Mock dependencies
jest.mock('fs')
jest.mock('path', () => ({
  join: jest.fn(),
  dirname: jest.fn()
}))
jest.mock('./logger', () => ({
  logger: {
    error: jest.fn()
  }
}))

// Store original implementations to use in mocks
const originalPath = jest.requireActual('path')

describe('nativeMessagingLogger', () => {
  const MOCK_PROJECT_ROOT = '/mock/project'
  const MOCK_LOG_DIR = originalPath.join(MOCK_PROJECT_ROOT, 'logs')
  const MOCK_LOG_FILE = originalPath.join(MOCK_LOG_DIR, 'native-messaging.log')

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()

    // Mock process.cwd()
    jest.spyOn(process, 'cwd').mockReturnValue(MOCK_PROJECT_ROOT)

    // Mock path module
    jest
      .spyOn(path, 'join')
      .mockImplementation((...args) => originalPath.join(...args))
    jest.spyOn(path, 'dirname').mockImplementation((p) => {
      if (p === MOCK_PROJECT_ROOT) {
        return '/mock'
      }
      if (p === '/mock') {
        return '/'
      }
      return '/'
    })

    // Default mock for fs.existsSync to find package.json
    fs.existsSync.mockImplementation(
      (p) => p === originalPath.join(MOCK_PROJECT_ROOT, 'package.json')
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create log directory if it does not exist and write a log message', () => {
    // Arrange
    fs.existsSync.mockImplementation((p) => {
      if (p === originalPath.join(MOCK_PROJECT_ROOT, 'package.json')) {
        return true // Found project root
      }
      if (p === MOCK_LOG_DIR) {
        return false // Log directory does not exist
      }
      return false
    })

    // Act
    log('TestComponent', 'INFO', 'This is a test message')

    // Assert
    expect(fs.mkdirSync).toHaveBeenCalledWith(MOCK_LOG_DIR, {
      recursive: true
    })
    expect(fs.appendFileSync).toHaveBeenCalledTimes(1)
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      MOCK_LOG_FILE,
      expect.stringContaining('[INFO] [TestComponent] This is a test message\n')
    )
  })

  it('should not create log directory if it already exists', () => {
    // Arrange
    fs.existsSync.mockImplementation(
      (p) =>
        // package.json and log dir both exist
        p === originalPath.join(MOCK_PROJECT_ROOT, 'package.json') ||
        p === MOCK_LOG_DIR
    )

    // Act
    log('ExistingDir', 'DEBUG', 'Another test')

    // Assert
    expect(fs.mkdirSync).not.toHaveBeenCalled()
    expect(fs.appendFileSync).toHaveBeenCalledTimes(1)
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      MOCK_LOG_FILE,
      expect.stringContaining('[DEBUG] [ExistingDir] Another test\n')
    )
  })

  it('should handle errors during file writing and log them using the main logger', () => {
    // Arrange
    const writeError = new Error('Disk full')
    fs.appendFileSync.mockImplementation(() => {
      throw writeError
    })
    fs.existsSync.mockReturnValue(true) // Assume everything exists

    // Act
    log('ErrorComponent', 'ERROR', 'Failed operation')

    // Assert
    expect(logger.error).toHaveBeenCalledTimes(2)
    expect(logger.error).toHaveBeenCalledWith(
      "[nativeMessagingLogger] Failed to write log entry - Component: ErrorComponent, Level: ERROR, Message: Failed operation'}"
    )
    expect(logger.error).toHaveBeenCalledWith(writeError)
  })

  it('should fall back to process.cwd() if package.json is not found', () => {
    // Arrange
    // Can't find package.json anywhere
    fs.existsSync.mockReturnValue(false)
    const cwdLogDir = originalPath.join(process.cwd(), 'logs')
    const cwdLogFile = originalPath.join(cwdLogDir, 'native-messaging.log')

    // Act
    log('Fallback', 'WARN', 'No root found')

    // Assert
    expect(fs.mkdirSync).toHaveBeenCalledWith(cwdLogDir, {
      recursive: true
    })
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      cwdLogFile,
      expect.stringContaining('[WARN] [Fallback] No root found\n')
    )
  })
})
