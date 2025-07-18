import { jest } from '@jest/globals'
import { AutopassHttpServer } from 'pearpass-lib-vault-desktop'

import { startServer, stopServer } from './autopassServer'
import { logger } from '../utils/logger'

jest.mock('pearpass-lib-vault-desktop', () => ({
  AutopassHttpServer: jest.fn()
}))

jest.mock('../utils/logger', () => ({
  logger: {
    log: jest.fn()
  }
}))

describe('startServer', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.autopassServerInstance = null
  })

  afterEach(async () => {
    await stopServer()
  })

  it('should create and start a new server instance when not already running', async () => {
    const mockPearpassClient = { some: 'client' }
    const port = 3000
    const mockAddressData = { address: '127.0.0.1', port: 3000 }

    AutopassHttpServer.mockImplementation(() => ({
      isListening: jest.fn().mockReturnValue(false),
      listen: jest.fn().mockResolvedValue(mockAddressData),
      close: jest.fn().mockResolvedValue(undefined)
    }))

    const result = await startServer(mockPearpassClient, port)

    expect(AutopassHttpServer).toHaveBeenCalledWith(mockPearpassClient)
    expect(result.listen).toHaveBeenCalledWith(port)
    expect(logger.log).toHaveBeenCalledWith(
      `Autopass HTTP server listening on ${mockAddressData.address}:${mockAddressData.port}`
    )
    expect(result).toBeDefined()
  })

  it('should handle server startup errors', async () => {
    const mockPearpassClient = { some: 'client' }
    const port = 3000
    const listenError = new Error('Failed to start server')

    AutopassHttpServer.mockImplementation(() => ({
      isListening: jest.fn().mockReturnValue(false),
      listen: jest.fn().mockRejectedValue(listenError),
      close: jest.fn()
    }))

    await expect(startServer(mockPearpassClient, port)).rejects.toThrow(
      listenError
    )
  })
})
