describe('createOrGetPipe', () => {
  let mockPipe
  let teardownCallback

  beforeEach(() => {
    jest.resetModules()

    mockPipe = { end: jest.fn() }
    global.Pear = {
      worker: {
        run: jest.fn().mockReturnValue(mockPipe)
      },
      teardown: jest.fn((callback) => {
        teardownCallback = callback
      }),
      config: {
        applink: 'https://example.com'
      }
    }
  })

  it('creates a new pipe when none exists', () => {
    const { createOrGetPipe } = require('./createOrGetPipe')
    const pipe = createOrGetPipe()

    expect(global.Pear.worker.run).toHaveBeenCalledWith(
      'https://example.com/node_modules/pearpass-lib-vault-mobile/src/worklet/app.js'
    )
    expect(pipe).toBe(mockPipe)
  })

  it('returns the existing pipe on subsequent calls', () => {
    const { createOrGetPipe } = require('./createOrGetPipe')
    const first = createOrGetPipe()
    const second = createOrGetPipe()

    expect(global.Pear.worker.run).toHaveBeenCalledTimes(1)
    expect(second).toBe(first)
  })

  it('registers and invokes teardown callback, ending and resetting the pipe', () => {
    const { createOrGetPipe } = require('./createOrGetPipe')
    createOrGetPipe()

    teardownCallback()

    expect(mockPipe.end).toHaveBeenCalled()

    const recreated = createOrGetPipe()
    expect(global.Pear.worker.run).toHaveBeenCalledTimes(2)
    expect(recreated).toBe(mockPipe)
  })
})
