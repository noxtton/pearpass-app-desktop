import { SecureRequestHandler } from './SecureRequestHandler'
import { logger } from '../../utils/logger'
import * as sessionManager from '../security/sessionManager.js'
import * as sessionStore from '../security/sessionStore.js'

jest.mock('../../utils/logger')
jest.mock('../security/sessionManager.js')
jest.mock('../security/sessionStore.js')

describe('SecureRequestHandler.handle', () => {
  let handler
  let mockClient
  let mockMethodRegistry

  beforeEach(() => {
    mockClient = {}
    mockMethodRegistry = {
      execute: jest.fn()
    }
    handler = new SecureRequestHandler(mockClient, mockMethodRegistry)
    jest.clearAllMocks()
  })

  it('should process a valid secure request and return encrypted response', async () => {
    const params = {
      sessionId: 'session123',
      nonceB64: Buffer.from('nonce').toString('base64'),
      ciphertextB64: Buffer.from('ciphertext').toString('base64'),
      seq: 42
    }

    // Mock session
    sessionStore.getSession.mockReturnValue({ id: 'session123' })
    sessionManager.recordIncomingSeq.mockImplementation(() => {})
    // Mock decryption
    const decryptedRequest = { method: 'testMethod', params: { foo: 'bar' } }
    sessionManager.decryptWithSession.mockReturnValue(
      Buffer.from(JSON.stringify(decryptedRequest), 'utf8')
    )
    // Mock method execution
    mockMethodRegistry.execute.mockResolvedValue('methodResult')
    // Mock encryption
    sessionManager.encryptWithSession.mockResolvedValue('encryptedResponse')

    const result = await handler.handle(params)

    expect(sessionStore.getSession).toHaveBeenCalledWith('session123')
    expect(sessionManager.recordIncomingSeq).toHaveBeenCalledWith(
      'session123',
      42
    )
    expect(sessionManager.decryptWithSession).toHaveBeenCalled()
    expect(mockMethodRegistry.execute).toHaveBeenCalledWith(
      'testMethod',
      { foo: 'bar' },
      { client: mockClient }
    )
    expect(sessionManager.encryptWithSession).toHaveBeenCalled()
    expect(result).toBe('encryptedResponse')
    expect(logger.debug).toHaveBeenCalledWith(
      'SECURE-REQUEST',
      'Received method: testMethod'
    )
  })

  it('should throw InvalidSecurePayload if payload is missing fields', async () => {
    await expect(handler.handle({})).rejects.toThrow('InvalidSecurePayload')
  })

  it('should throw SessionNotFound if session does not exist', async () => {
    sessionStore.getSession.mockReturnValue(undefined)
    const params = {
      sessionId: 'bad-session',
      nonceB64: 'nonce',
      ciphertextB64: 'ciphertext',
      seq: 1
    }
    await expect(handler.handle(params)).rejects.toThrow('SessionNotFound')
  })
})
