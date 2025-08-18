import { renderHook } from '@testing-library/react'

import { usePearUpdate } from './usePearUpdate'
import { useModal } from '../context/ModalContext'

const mockSetModal = jest.fn()
const mockRestart = jest.fn()
const mockUpdates = jest.fn()

jest.mock('../context/ModalContext', () => ({
  useModal: jest.fn()
}))

global.Pear = {
  restart: mockRestart,
  updates: (cb) => mockUpdates(cb)
}

describe('usePearUpdate', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    useModal.mockReturnValue({
      setModal: mockSetModal
    })
  })

  test('shows modal when non-ignored update is received', () => {
    renderHook(() => usePearUpdate())

    const updateHandler = mockUpdates.mock.calls[0][0]
    updateHandler({ diff: [{ key: '/src/index.js' }] })

    expect(mockSetModal).toHaveBeenCalledTimes(1)
    const [modalElement, options] = mockSetModal.mock.calls[0]

    expect(modalElement.type.name).toBe('UpdateRequiredModalContent')
    expect(options.closeable).toBe(false)
  })

  test('does not show modal for ignored changes', () => {
    renderHook(() => usePearUpdate())
    const updateHandler = mockUpdates.mock.calls[0][0]

    updateHandler({ diff: [{ key: '/logs/debug.log' }] })

    updateHandler({
      diff: [{ key: '/some/path/pearpass-native-messaging.sock' }]
    })

    expect(mockSetModal).not.toHaveBeenCalled()
  })

  test('does not show modal twice', () => {
    renderHook(() => usePearUpdate())
    const updateHandler = mockUpdates.mock.calls[0][0]

    updateHandler({ diff: [{ key: '/src/index.js' }] })
    updateHandler({ diff: [{ key: '/src/anotherFile.js' }] })

    expect(mockSetModal).toHaveBeenCalledTimes(1)
  })

  test('calls Pear.restart when onUpdate is triggered from modal', () => {
    renderHook(() => usePearUpdate())
    const updateHandler = mockUpdates.mock.calls[0][0]

    updateHandler({ diff: [{ key: '/src/index.js' }] })

    const [modalElement] = mockSetModal.mock.calls[0]

    modalElement.props.onUpdate()

    expect(mockRestart).toHaveBeenCalledWith({ platform: false })
  })
})
