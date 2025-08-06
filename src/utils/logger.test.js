import { logger } from './logger'

describe('Logger', () => {
  let consoleErrorSpy

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('should call console.error with the formatted message', () => {
    const messages = ['Error message 1', 'Error message 2']
    logger.error(...messages)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(
        /\[ERROR\] \[GENERAL\] Error message 1 Error message 2$/
      )
    )
  })

  it('should not modify the messages passed to error method', () => {
    const messages = ['Error message']
    logger.error(...messages)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[ERROR\] \[GENERAL\] Error message$/)
    )
    expect(messages).toEqual(['Error message'])
  })
})
