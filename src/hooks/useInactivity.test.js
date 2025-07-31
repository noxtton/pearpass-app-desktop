import React from 'react'

import { render, act } from '@testing-library/react'

const { useInactivity } = require('./useInactivity')

jest.mock('pearpass-lib-vault', () => ({
  closeAllInstances: jest.fn(() => Promise.resolve()),
  useVaults: () => ({
    resetState: jest.fn()
  })
}))

jest.mock('../context/LoadingContext', () => ({
  useLoadingContext: () => ({
    setIsLoading: jest.fn()
  })
}))

jest.mock('../context/RouterContext', () => ({
  useRouter: () => ({
    currentPage: 'home',
    data: {},
    navigate: jest.fn()
  })
}))

describe('useInactivity', () => {
  let addEventListenerSpy
  let removeEventListenerSpy
  let clearTimeoutSpy
  let setTimeoutSpy

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    setTimeoutSpy = jest.spyOn(global, 'setTimeout')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should add and remove event listeners on mount/unmount', () => {
    function TestComponent() {
      useInactivity({ timeoutMs: 500 })
      return null
    }

    const { unmount } = render(<TestComponent />)
    expect(addEventListenerSpy).toHaveBeenCalled()
    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalled()
  })

  it('should call resetTimer on activity events', () => {
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll']
    function TestComponent() {
      useInactivity({ timeoutMs: 500 })
      return null
    }
    render(<TestComponent />)
    events.forEach((event) => {
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        event,
        expect.any(Function)
      )
    })
  })

  it('should set and clear timeout on mount/unmount', () => {
    function TestComponent() {
      useInactivity({ timeoutMs: 500 })
      return null
    }
    const { unmount } = render(<TestComponent />)
    expect(setTimeoutSpy).toHaveBeenCalled()
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })

  it('should expose resetInactivity function', () => {
    let hookResult
    function TestComponent() {
      hookResult = useInactivity({ timeoutMs: 500 })
      return null
    }
    render(<TestComponent />)
    expect(typeof hookResult.resetInactivity).toBe('function')
    act(() => {
      hookResult.resetInactivity()
    })
    expect(setTimeoutSpy).toHaveBeenCalled()
  })
})
