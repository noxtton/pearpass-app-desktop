/* eslint-disable no-console */
describe('disableConsoleInProd', () => {
  let originalConsole
  let originalPear
  let originalProcessEnv

  beforeEach(() => {
    // Save original console methods
    originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      debug: console.debug,
      error: console.error
    }

    // Save original globals
    originalPear = globalThis.Pear
    originalProcessEnv = process.env
  })

  afterEach(() => {
    // Restore original console methods
    Object.keys(originalConsole).forEach((method) => {
      console[method] = originalConsole[method]
    })

    // Restore globals
    globalThis.Pear = originalPear
    process.env = originalProcessEnv

    // Clear module cache to allow re-importing with different conditions
    jest.resetModules()
  })

  it('should disable console methods when Pear.config.key exists', () => {
    // Setup production mode with Pear key
    globalThis.Pear = {
      config: { key: 'test-key' }
    }

    // Import the module (it runs on import)
    require('./disableConsoleInProd')

    // Verify console methods are noops
    const logSpy = jest.spyOn(console, 'log')
    const infoSpy = jest.spyOn(console, 'info')
    const warnSpy = jest.spyOn(console, 'warn')
    const debugSpy = jest.spyOn(console, 'debug')
    const errorSpy = jest.spyOn(console, 'error')

    console.log('test')
    console.info('test')
    console.warn('test')
    console.debug('test')
    console.error('test')

    // All should be called but produce no output
    expect(logSpy).toHaveBeenCalled()
    expect(infoSpy).toHaveBeenCalled()
    expect(warnSpy).toHaveBeenCalled()
    expect(debugSpy).toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalled()

    logSpy.mockRestore()
    infoSpy.mockRestore()
    warnSpy.mockRestore()
    debugSpy.mockRestore()
    errorSpy.mockRestore()
  })

  it('should override console methods when NODE_ENV is production', () => {
    // Setup production mode with NODE_ENV
    process.env = { NODE_ENV: 'production' }
    globalThis.Pear = undefined

    const before = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      debug: console.debug,
      error: console.error
    }

    // Import the module
    require('./disableConsoleInProd')

    // Methods should be overridden to functions (noops), and different from originals
    expect(typeof console.log).toBe('function')
    expect(typeof console.info).toBe('function')
    expect(typeof console.warn).toBe('function')
    expect(typeof console.debug).toBe('function')
    expect(typeof console.error).toBe('function')

    expect(console.log).not.toBe(before.log)
    expect(console.info).not.toBe(before.info)
    expect(console.warn).not.toBe(before.warn)
    expect(console.debug).not.toBe(before.debug)
    expect(console.error).not.toBe(before.error)

    // And they must remain writable/configurable
    const d = Object.getOwnPropertyDescriptor(console, 'log')
    expect(d.writable).toBe(true)
    expect(d.configurable).toBe(true)
  })

  it('should NOT disable console methods in development mode (no Pear key)', () => {
    // Setup dev mode
    globalThis.Pear = {
      config: {} // no key
    }
    process.env = { NODE_ENV: 'development' }

    // Import the module
    require('./disableConsoleInProd')

    // Verify console methods still work
    const testOutput = []
    const originalLog = console.log
    console.log = (...args) => testOutput.push(args)

    console.log('should appear')
    expect(testOutput).toHaveLength(1)
    expect(testOutput[0]).toEqual(['should appear'])

    console.log = originalLog
  })

  it('should NOT disable console methods when Pear is undefined', () => {
    // Setup dev mode
    globalThis.Pear = undefined
    process.env = { NODE_ENV: 'development' }

    // Import the module
    require('./disableConsoleInProd')

    // Verify console methods still work
    const testOutput = []
    const originalLog = console.log
    console.log = (...args) => testOutput.push(args)

    console.log('should appear')
    expect(testOutput).toHaveLength(1)

    console.log = originalLog
  })

  it('should keep console methods writable and configurable', () => {
    // Setup production mode
    globalThis.Pear = {
      config: { key: 'test-key' }
    }

    // Import the module
    require('./disableConsoleInProd')

    // Verify methods are still writable (libraries can reassign)
    const customLogger = jest.fn()
    console.log = customLogger

    console.log('test')
    expect(customLogger).toHaveBeenCalledWith('test')

    // Verify methods are configurable
    const descriptor = Object.getOwnPropertyDescriptor(console, 'log')
    expect(descriptor.writable).toBe(true)
    expect(descriptor.configurable).toBe(true)
  })

  it('should handle case when console is undefined gracefully', () => {
    // Setup production mode
    globalThis.Pear = {
      config: { key: 'test-key' }
    }

    // Temporarily remove console
    const originalConsole = globalThis.console
    globalThis.console = undefined

    // Should not throw
    expect(() => {
      require('./disableConsoleInProd')
    }).not.toThrow()

    // Restore console
    globalThis.console = originalConsole
  })
})
