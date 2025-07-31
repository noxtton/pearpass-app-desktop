import fs from 'fs'
import os from 'os'
import path from 'path'

import { logger } from './logger'
import { log } from './nativeMessagingLogger'

// Mock dependencies
jest.mock('fs')
jest.mock('os')
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
  const MOCK_TEMP_DIR = '/mock/tmp'
  const MOCK_LOG_DIR = originalPath.join(MOCK_TEMP_DIR, 'logs')
  const MOCK_LOG_FILE = originalPath.join(MOCK_LOG_DIR, 'native-messaging.log')

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()

    // Mock os.tmpdir to return our mock temp directory
    os.tmpdir.mockReturnValue(MOCK_TEMP_DIR)

    // Mock path module
    jest
      .spyOn(path, 'join')
      .mockImplementation((...args) => originalPath.join(...args))
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should create log directory if it does not exist and write a log message', () => {
    // Arrange
    fs.existsSync.mockImplementation((p) => {
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
    fs.existsSync.mockImplementation((p) => p === MOCK_LOG_DIR)

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

  it('should use the temp directory returned by os.tmpdir()', () => {
    // Arrange
    const customTempDir = '/custom/temp/dir'
    os.tmpdir.mockReturnValue(customTempDir)
    const customLogDir = originalPath.join(customTempDir, 'logs')
    const customLogFile = originalPath.join(customLogDir, 'native-messaging.log')
    fs.existsSync.mockReturnValue(false) // Log directory doesn't exist

    // Act
    log('CustomTemp', 'WARN', 'Using custom temp dir')

    // Assert
    expect(os.tmpdir).toHaveBeenCalled()
    expect(fs.mkdirSync).toHaveBeenCalledWith(customLogDir, {
      recursive: true
    })
    expect(fs.appendFileSync).toHaveBeenCalledWith(
      customLogFile,
      expect.stringContaining('[WARN] [CustomTemp] Using custom temp dir\n')
    )
  })
})
