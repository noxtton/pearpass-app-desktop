import { SecurityHandlers } from './SecurityHandlers'
import * as appIdentity from '../security/appIdentity'
import * as sessionManager from '../security/sessionManager'
import * as sessionStore from '../security/sessionStore'

jest.mock('../security/appIdentity')
jest.mock('../security/sessionManager')
jest.mock('../security/sessionStore')

describe('SecurityHandlers', () => {
  let client
  let handlers

  beforeEach(() => {
    client = { id: 'test-client' }
    handlers = new SecurityHandlers(client)
    jest.clearAllMocks()
  })

  describe('nmGetAppIdentity', () => {
    it('throws if pairingToken is missing', async () => {
      await expect(handlers.nmGetAppIdentity({})).rejects.toThrow(
        /PairingTokenRequired/
      )
    })

    it('throws if verifyPairingToken returns false', async () => {
      appIdentity.getOrCreateIdentity.mockResolvedValue({
        ed25519PublicKey: 'pubKey',
        x25519PublicKey: 'xPubKey'
      })
      appIdentity.verifyPairingToken.mockResolvedValue(false)
      await expect(
        handlers.nmGetAppIdentity({ pairingToken: 'token' })
      ).rejects.toThrow(/InvalidPairingToken/)
    })

    it('returns identity info if pairingToken is valid', async () => {
      appIdentity.getOrCreateIdentity.mockResolvedValue({
        ed25519PublicKey: 'pubKey',
        x25519PublicKey: 'xPubKey'
      })
      appIdentity.verifyPairingToken.mockResolvedValue(true)
      appIdentity.getFingerprint.mockReturnValue('fingerprint')
      const result = await handlers.nmGetAppIdentity({ pairingToken: 'token' })
      expect(result).toEqual({
        ed25519PublicKey: 'pubKey',
        x25519PublicKey: 'xPubKey',
        fingerprint: 'fingerprint'
      })
    })
  })

  describe('nmBeginHandshake', () => {
    it('throws if extEphemeralPubB64 is missing', async () => {
      await expect(handlers.nmBeginHandshake({})).rejects.toThrow(
        /Missing extEphemeralPubB64/
      )
    })

    it('calls beginHandshake with correct params', async () => {
      sessionManager.beginHandshake.mockResolvedValue('handshake-result')
      const result = await handlers.nmBeginHandshake({
        extEphemeralPubB64: 'abc'
      })
      expect(sessionManager.beginHandshake).toHaveBeenCalledWith(client, 'abc')
      expect(result).toBe('handshake-result')
    })
  })

  describe('nmFinishHandshake', () => {
    it('throws if sessionId is missing', async () => {
      await expect(handlers.nmFinishHandshake({})).rejects.toThrow(
        /Missing sessionId/
      )
    })

    it('throws if session not found', async () => {
      sessionStore.getSession.mockReturnValue(undefined)
      await expect(
        handlers.nmFinishHandshake({ sessionId: 'sid' })
      ).rejects.toThrow(/SessionNotFound/)
    })

    it('returns ok if session exists', async () => {
      sessionStore.getSession.mockReturnValue({ id: 'sid' })
      const result = await handlers.nmFinishHandshake({ sessionId: 'sid' })
      expect(result).toEqual({ ok: true })
    })
  })

  describe('nmCloseSession', () => {
    it('throws if sessionId is missing', async () => {
      await expect(handlers.nmCloseSession({})).rejects.toThrow(
        /Missing sessionId/
      )
    })

    it('calls closeSession and returns ok', async () => {
      sessionStore.closeSession.mockReturnValue(undefined)
      const result = await handlers.nmCloseSession({ sessionId: 'sid' })
      expect(sessionStore.closeSession).toHaveBeenCalledWith('sid')
      expect(result).toEqual({ ok: true })
    })
  })

  describe('checkAvailability', () => {
    it('returns available status', async () => {
      const result = await handlers.checkAvailability()
      expect(result).toEqual({
        available: true,
        status: 'running',
        message: 'Desktop app is running'
      })
    })
  })

  describe('nmResetPairing', () => {
    it('clears sessions and resets identity', async () => {
      sessionStore.clearAllSessions.mockReturnValue(['sid1', 'sid2'])
      appIdentity.resetIdentity.mockResolvedValue({
        ed25519PublicKey: 'newPub',
        x25519PublicKey: 'newXPub',
        creationDate: '2024-01-01'
      })
      const result = await handlers.nmResetPairing()
      expect(sessionStore.clearAllSessions).toHaveBeenCalled()
      expect(appIdentity.resetIdentity).toHaveBeenCalledWith(client)
      expect(result).toEqual({
        ok: true,
        clearedSessions: ['sid1', 'sid2'],
        newIdentity: {
          ed25519PublicKey: 'newPub',
          x25519PublicKey: 'newXPub',
          creationDate: '2024-01-01'
        }
      })
    })
  })
})
