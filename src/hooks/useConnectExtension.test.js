import { renderHook, act, waitFor } from '@testing-library/react'

import { useConnectExtension } from './useConnectExtension'
import { createOrGetPearpassClient } from '../services/createOrGetPearpassClient'
import {
  isNativeMessagingIPCRunning,
  startNativeMessagingIPC,
  stopNativeMessagingIPC
} from '../services/nativeMessagingIPCServer'
import {
  getNativeMessagingEnabled,
  setNativeMessagingEnabled
} from '../services/nativeMessagingPreferences'
import {
  getFingerprint,
  getOrCreateIdentity,
  getPairingCode
} from '../services/security/appIdentity'
import { setupNativeMessaging } from '../utils/nativeMessagingSetup'

const mockSetModal = jest.fn()
const mockSetToast = jest.fn()

jest.mock('../context/ModalContext', () => ({
  useModal: () => ({ setModal: mockSetModal })
}))
jest.mock('../context/ToastContext', () => ({
  useToast: () => ({ setToast: mockSetToast })
}))
jest.mock('@lingui/react', () => ({
  useLingui: () => ({ i18n: { _: (msg) => msg } })
}))

jest.mock('../services/createOrGetPearpassClient', () => ({
  createOrGetPearpassClient: jest.fn()
}))
jest.mock('../services/nativeMessagingIPCServer', () => ({
  isNativeMessagingIPCRunning: jest.fn(),
  startNativeMessagingIPC: jest.fn(),
  stopNativeMessagingIPC: jest.fn()
}))
jest.mock('../services/nativeMessagingPreferences', () => ({
  getNativeMessagingEnabled: jest.fn(),
  setNativeMessagingEnabled: jest.fn()
}))
jest.mock('../services/security/appIdentity', () => ({
  getFingerprint: jest.fn(),
  getOrCreateIdentity: jest.fn(),
  getPairingCode: jest.fn(),
  resetIdentity: jest.fn()
}))
jest.mock('../utils/nativeMessagingSetup', () => ({
  setupNativeMessaging: jest.fn()
}))

describe('useConnectExtension', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('initializes extension state if enabled and running', () => {
    getNativeMessagingEnabled.mockReturnValue(true)
    isNativeMessagingIPCRunning.mockReturnValue(true)

    const { result } = renderHook(() => useConnectExtension())
    expect(result.current.isBrowserExtensionEnabled).toBe(true)
  })

  it('does not enable if not running or not enabled', () => {
    getNativeMessagingEnabled.mockReturnValue(false)
    isNativeMessagingIPCRunning.mockReturnValue(false)

    const { result } = renderHook(() => useConnectExtension())
    expect(result.current.isBrowserExtensionEnabled).toBe(false)
  })

  it('connects extension successfully via toggleBrowserExtension', async () => {
    setupNativeMessaging.mockResolvedValue({ success: true })
    startNativeMessagingIPC.mockResolvedValue()
    createOrGetPearpassClient.mockReturnValue({})

    // Mock setModal to inject an onConnectSubmit function that calls setupNativeMessaging and then startNativeMessagingIPC if successful
    mockSetModal.mockImplementation((modal) => {
      modal.onConnectSubmit = async (id) => {
        const result = await setupNativeMessaging(id)
        if (result.success) {
          await startNativeMessagingIPC()
          setNativeMessagingEnabled(true)
        }
      }
      return modal
    })

    const { result } = renderHook(() => useConnectExtension())

    await act(async () => {
      await result.current.toggleBrowserExtension(true)
    })

    // Extract the modal object from the mock calls and get the onConnectSubmit handler
    const modalElement = mockSetModal.mock.calls[0][0]
    await act(async () => {
      await modalElement.onConnectSubmit('fake-ext-id')
    })

    expect(setupNativeMessaging).toHaveBeenCalledWith('fake-ext-id')
    expect(startNativeMessagingIPC).toHaveBeenCalled()
    expect(setNativeMessagingEnabled).toHaveBeenCalledWith(true)
  })

  it('handles setup failure gracefully via toggleBrowserExtension', async () => {
    setupNativeMessaging.mockResolvedValue({ success: false, message: 'fail' })

    const { result } = renderHook(() => useConnectExtension())

    mockSetModal.mockImplementationOnce((modal) => {
      modal.onConnectSubmit = async (id) => setupNativeMessaging(id)
      return modal
    })

    await act(async () => {
      await result.current.toggleBrowserExtension(true)
    })

    const modalElement = mockSetModal.mock.calls[0][0]
    await act(async () => {
      await modalElement.onConnectSubmit('bad-ext-id')
    })

    expect(setupNativeMessaging).toHaveBeenCalledWith('bad-ext-id')
    expect(startNativeMessagingIPC).not.toHaveBeenCalled()
  })

  it('stops native messaging when toggled off', async () => {
    stopNativeMessagingIPC.mockResolvedValue()

    const { result } = renderHook(() => useConnectExtension())

    await act(async () => {
      await result.current.toggleBrowserExtension(false)
    })

    expect(stopNativeMessagingIPC).toHaveBeenCalled()
    expect(setNativeMessagingEnabled).toHaveBeenCalledWith(false)
  })

  it('loads pairing info on enable', async () => {
    const fakeIdentity = {
      ed25519PublicKey: 'pubkey',
      creationDate: '2023-01-01'
    }

    getOrCreateIdentity.mockResolvedValue(fakeIdentity)
    getPairingCode.mockReturnValue('PAIRCODE')
    getFingerprint.mockReturnValue('ABCD1234')

    getNativeMessagingEnabled.mockReturnValue(true)
    isNativeMessagingIPCRunning.mockReturnValue(true)
    createOrGetPearpassClient.mockReturnValue({})

    const { result } = renderHook(() => useConnectExtension())

    await waitFor(() => {
      expect(result.current.isBrowserExtensionEnabled).toBe(true)
      expect(getOrCreateIdentity).toHaveBeenCalled()
      expect(getPairingCode).toHaveBeenCalledWith('pubkey')
      expect(getFingerprint).toHaveBeenCalledWith('pubkey')
    })
  })
})
