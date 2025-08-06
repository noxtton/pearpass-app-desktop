import { platform } from 'os'
import { join } from 'path'

import IPC from 'pear-ipc'

import {
  getIpcPath,
  NativeMessagingIPCServer,
  startNativeMessagingIPC,
  stopNativeMessagingIPC,
  isNativeMessagingIPCRunning,
  getIPCSocketPath
} from './nativeMessagingIPCServer.js'
import { logger } from '../utils/logger.js'

// Mock dependencies
jest.mock('os', () => ({
  ...jest.requireActual('os'),
  platform: jest.fn(),
  tmpdir: jest.fn(() => '/tmp')
}))

// Mock Pear.config.storage
global.Pear = {
  config: {
    storage: '/mock/pear/storage'
  }
}

jest.mock('pear-ipc', () => ({
  Server: jest.fn().mockImplementation(function (options) {
    this.options = options
    this.on = jest.fn()
    this.ready = jest.fn().mockResolvedValue()
    this.close = jest.fn().mockResolvedValue()
    return this
  })
}))

jest.mock('../utils/logger.js', () => ({
  logger: {
    log: jest.fn(),
    error: jest.fn(),
    debugMode: true
  }
}))

const mockPearpassClient = {
  encryptionInit: jest.fn(),
  encryptionGetStatus: jest.fn(),
  encryptionGet: jest.fn(),
  encryptionAdd: jest.fn(),
  vaultsInit: jest.fn(),
  vaultsGetStatus: jest.fn(),
  vaultsGet: jest.fn(),
  vaultsList: jest.fn(),
  vaultsAdd: jest.fn(),
  vaultsClose: jest.fn(),
  activeVaultInit: jest.fn(),
  activeVaultGetStatus: jest.fn(),
  activeVaultGet: jest.fn(),
  activeVaultList: jest.fn(),
  activeVaultAdd: jest.fn(),
  activeVaultRemove: jest.fn(),
  activeVaultClose: jest.fn(),
  activeVaultCreateInvite: jest.fn(),
  activeVaultDeleteInvite: jest.fn(),
  hashPassword: jest.fn(),
  encryptVaultKeyWithHashedPassword: jest.fn(),
  encryptVaultWithKey: jest.fn(),
  getDecryptionKey: jest.fn(),
  decryptVaultKey: jest.fn(),
  pair: jest.fn(),
  initListener: jest.fn(),
  close: jest.fn()
}

describe('nativeMessagingIPCServer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset singleton instance state before each test
    stopNativeMessagingIPC().catch(() => {})
  })

  describe('getIpcPath', () => {
    it('should return a windows named pipe path on win32', () => {
      platform.mockReturnValue('win32')
      const socketName = 'test-socket'
      expect(getIpcPath(socketName)).toBe(`\\\\?\\pipe\\${socketName}`)
    })

    it('should return a unix domain socket path on non-win32 platforms', () => {
      platform.mockReturnValue('linux')
      const socketName = 'test-socket'
      expect(getIpcPath(socketName)).toBe(join('/tmp', `${socketName}.sock`))
    })
  })

  describe('NativeMessagingIPCServer', () => {
    let serverInstance

    beforeEach(() => {
      platform.mockReturnValue('linux')
      serverInstance = new NativeMessagingIPCServer(mockPearpassClient)
    })

    it('should construct with initial state', () => {
      expect(serverInstance.client).toBe(mockPearpassClient)
      expect(serverInstance.server).toBeNull()
      expect(serverInstance.isRunning).toBe(false)
      expect(serverInstance.socketPath).toBe(
        join('/tmp', 'pearpass-native-messaging.sock')
      )
    })

    describe('start', () => {
      it('should start the IPC server successfully', async () => {
        await serverInstance.start()

        expect(IPC.Server).toHaveBeenCalledTimes(1)
        expect(serverInstance.server.ready).toHaveBeenCalledTimes(1)
        expect(serverInstance.isRunning).toBe(true)
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          'Starting native messaging IPC server...'
        )
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          `Native messaging IPC server started successfully on ${serverInstance.socketPath}`
        )
      })

      it('should not start if already running', async () => {
        serverInstance.isRunning = true
        await serverInstance.start()

        expect(IPC.Server).not.toHaveBeenCalled()
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          'IPC server is already running'
        )
      })

      it('should handle and log errors during startup', async () => {
        const error = new Error('Startup failed')
        IPC.Server.mockImplementationOnce(function () {
          this.on = jest.fn()
          this.ready = jest.fn().mockRejectedValue(error)
          return this
        })

        const newServer = new NativeMessagingIPCServer(mockPearpassClient)
        await expect(newServer.start()).rejects.toThrow(error)
        expect(newServer.isRunning).toBe(false)
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          `Failed to start IPC server: ${error.message}`
        )
      })

      it('should correctly wire up handlers to the pearpass client', async () => {
        await serverInstance.start()
        const handlers = IPC.Server.mock.calls[0][0].handlers

        await handlers.encryptionInit()
        expect(mockPearpassClient.encryptionInit).toHaveBeenCalled()

        const getParams = { key: 'testKey' }
        await handlers.encryptionGet(getParams)
        expect(mockPearpassClient.encryptionGet).toHaveBeenCalledWith(
          getParams.key
        )

        const addParams = { key: 'testKey', data: 'testData' }
        await handlers.encryptionAdd(addParams)
        expect(mockPearpassClient.encryptionAdd).toHaveBeenCalledWith(
          addParams.key,
          addParams.data
        )
      })
    })

    describe('stop', () => {
      it('should stop the server if it is running', async () => {
        await serverInstance.start()
        const server = serverInstance.server

        await serverInstance.stop()

        expect(server.close).toHaveBeenCalledTimes(1)
        expect(serverInstance.isRunning).toBe(false)
        expect(serverInstance.server).toBeNull()
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          'Stopping native messaging IPC server...'
        )
        expect(logger.log).toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          'Native messaging IPC server stopped'
        )
      })

      it('should not do anything if the server is not running', async () => {
        await serverInstance.stop()
        expect(logger.log).not.toHaveBeenCalledWith(
          'IPC-SERVER',
          'INFO',
          'Stopping native messaging IPC server...'
        )
      })
    })
  })

  describe('Singleton Functions', () => {
    beforeEach(() => {
      platform.mockReturnValue('linux')
    })

    it('startNativeMessagingIPC should start and return an instance', async () => {
      const instance = await startNativeMessagingIPC(mockPearpassClient)
      expect(instance).toBeInstanceOf(NativeMessagingIPCServer)
      expect(instance.isRunning).toBe(true)
      expect(isNativeMessagingIPCRunning()).toBe(true)
    })

    it('startNativeMessagingIPC should return the existing instance if already running', async () => {
      const instance1 = await startNativeMessagingIPC(mockPearpassClient)
      const instance2 = await startNativeMessagingIPC(mockPearpassClient)
      expect(instance1).toBe(instance2)
      expect(logger.log).toHaveBeenCalledWith(
        'IPC-SERVER',
        'INFO',
        'Native messaging IPC server is already running'
      )
    })

    it('stopNativeMessagingIPC should stop the running instance', async () => {
      await startNativeMessagingIPC(mockPearpassClient)
      expect(isNativeMessagingIPCRunning()).toBe(true)

      await stopNativeMessagingIPC()
      expect(isNativeMessagingIPCRunning()).toBe(false)
    })

    it('stopNativeMessagingIPC should do nothing if not running', async () => {
      await stopNativeMessagingIPC()
      expect(logger.log).toHaveBeenCalledWith(
        'IPC-SERVER',
        'INFO',
        'Native messaging IPC server is not running'
      )
    })

    it('getIPCSocketPath should return the correct path when running', async () => {
      const instance = await startNativeMessagingIPC(mockPearpassClient)
      expect(getIPCSocketPath()).toBe(instance.socketPath)
    })

    it('getIPCSocketPath should return a default path when not running', () => {
      platform.mockReturnValue('linux')
      expect(getIPCSocketPath()).toBe(
        join('/tmp', 'pearpass-native-messaging.sock')
      )
    })
  })
})
