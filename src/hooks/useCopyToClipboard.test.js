import { renderHook, act, waitFor } from '@testing-library/react'

import { useCopyToClipboard } from './useCopyToClipboard'

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockImplementation(() => Promise.resolve())
  }
})

jest.useFakeTimers()

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('initial state is not copied', () => {
    const { result } = renderHook(() => useCopyToClipboard())
    expect(result.current.isCopied).toBe(false)
  })

  test('copyToClipboard calls navigator.clipboard.writeText with correct text', () => {
    const { result } = renderHook(() => useCopyToClipboard())

    act(() => {
      result.current.copyToClipboard('test text')
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text')
  })

  test('isCopied becomes true after successful copy', async () => {
    navigator.clipboard.writeText.mockResolvedValueOnce()
    const { result } = renderHook(() => useCopyToClipboard())

    await act(async () => {
      result.current.copyToClipboard('test text')
    })

    await waitFor(() => {
      expect(result.current.isCopied).toBe(true)
    })
  })

  test('isCopied becomes false after timeout', async () => {
    navigator.clipboard.writeText.mockResolvedValueOnce()
    const { result } = renderHook(() => useCopyToClipboard())

    act(() => {
      result.current.copyToClipboard('test text')
    })

    await act(async () => {
      await Promise.resolve()
      jest.runAllTimers()
    })

    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(result.current.isCopied).toBe(false)
  })

  test('onCopy callback is called when copying is successful', async () => {
    const onCopy = jest.fn()
    navigator.clipboard.writeText.mockResolvedValueOnce()
    const { result } = renderHook(() => useCopyToClipboard({ onCopy }))

    act(() => {
      result.current.copyToClipboard('test text')
    })

    await act(async () => {
      await Promise.resolve()
      jest.runAllTimers()
    })

    expect(onCopy).toHaveBeenCalledTimes(1)
  })

  test('returns false when clipboard API is not available', () => {
    const originalClipboard = navigator.clipboard
    delete navigator.clipboard

    console.error = jest.fn()

    const { result } = renderHook(() => useCopyToClipboard())

    let returnValue
    act(() => {
      returnValue = result.current.copyToClipboard('test text')
    })

    expect(returnValue).toBe(false)
    expect(console.error).toHaveBeenCalledWith('Clipboard API is not available')

    navigator.clipboard = originalClipboard
  })
})
