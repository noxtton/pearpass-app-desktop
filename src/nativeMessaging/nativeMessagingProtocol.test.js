import {
  wrapMessage,
  unwrapMessage,
  isWrappedMessage
} from './nativeMessagingProtocol'
import { logger } from '../utils/logger'

// Mock the logger to prevent console output during tests and to spy on its methods
jest.mock('../utils/logger', () => ({
  logger: {
    error: jest.fn()
  }
}))

describe('nativeMessagingProtocol', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks()
  })

  describe('wrapMessage', () => {
    it('should wrap a simple object with its length and the original message', () => {
      const originalMessage = {
        type: 'test',
        payload: 'hello'
      }
      const wrapped = wrapMessage(originalMessage)

      const expectedJson = JSON.stringify(originalMessage)
      const expectedLength = Buffer.from(expectedJson).length

      expect(wrapped).toEqual({
        length: expectedLength,
        message: originalMessage
      })
    })

    it('should correctly calculate the byte length for a message with unicode characters', () => {
      const originalMessage = {
        data: '123'
      } // '123' is 3 bytes in UTF-8
      const wrapped = wrapMessage(originalMessage)

      const expectedJson = JSON.stringify(originalMessage)
      const expectedLength = Buffer.from(expectedJson).length

      expect(wrapped.length).toBe(expectedLength)
      expect(wrapped.length).toBe(14) // {"data":"123"} -> 14 bytes
    })

    it('should handle an empty object', () => {
      const originalMessage = {}
      const wrapped = wrapMessage(originalMessage)

      expect(wrapped).toEqual({
        length: 2, // '{}' is 2 bytes
        message: {}
      })
    })

    it('should handle complex nested objects and arrays', () => {
      const originalMessage = {
        id: 123,
        items: [
          {
            name: 'item1',
            value: true
          },
          null
        ],
        metadata: {
          source: 'test'
        }
      }
      const wrapped = wrapMessage(originalMessage)
      const expectedJson = JSON.stringify(originalMessage)
      const expectedLength = Buffer.from(expectedJson).length

      expect(wrapped.length).toBe(expectedLength)
      expect(wrapped.message).toEqual(originalMessage)
    })
  })

  describe('unwrapMessage', () => {
    it('should correctly unwrap a valid message', () => {
      const originalMessage = {
        action: 'getData',
        id: 42
      }
      const wrapped = wrapMessage(originalMessage)
      const unwrapped = unwrapMessage(wrapped)

      expect(unwrapped).toEqual(originalMessage)
      expect(logger.error).not.toHaveBeenCalled()
    })

    it('should return null if the length property does not match the actual message length', () => {
      const message = {
        data: 'some data'
      }
      const wrappedWithIncorrectLength = {
        length: 10, // Incorrect length
        message: message
      }

      const unwrapped = unwrapMessage(wrappedWithIncorrectLength)
      const actualLength = Buffer.from(JSON.stringify(message)).length

      expect(unwrapped).toBeNull()
      expect(logger.error).toHaveBeenCalledWith(
        '[Protocol] Length mismatch - expected:',
        10,
        'actual:',
        actualLength
      )
    })

    test.each([
      [null, 'null'],
      [undefined, 'undefined'],
      ['string', 'a string'],
      [123, 'a number'],
      [{}, 'an object missing length and message'],
      [
        {
          message: {}
        },
        'an object missing length'
      ],
      [
        {
          length: 10
        },
        'an object missing message'
      ],
      [
        {
          length: '10',
          message: {}
        },
        'an object with length not a number'
      ]
    ])(
      'should return null for invalid wrapped structure: %s',
      (invalidInput) => {
        const unwrapped = unwrapMessage(invalidInput)
        expect(unwrapped).toBeNull()
        expect(logger.error).toHaveBeenCalledWith(
          '[Protocol] Invalid message structure'
        )
      }
    )
  })

  describe('isWrappedMessage', () => {
    it('should return true for a valid wrapped message structure', () => {
      const wrappedMessage = {
        length: 25,
        message: {
          type: 'action',
          payload: 'data'
        }
      }
      expect(isWrappedMessage(wrappedMessage)).toBe(true)
    })

    it('should return true for a message with extra properties', () => {
      const wrappedMessage = {
        length: 10,
        message: {},
        extra: 'property'
      }
      expect(isWrappedMessage(wrappedMessage)).toBe(true)
    })

    test.each([
      [null, 'null'],
      [undefined, 'undefined'],
      ['string', 'a string'],
      [123, 'a number'],
      [{}, 'an empty object'],
      [
        {
          message: {}
        },
        'an object missing length'
      ],
      [
        {
          length: 10
        },
        'an object missing message'
      ]
    ])('should return false for invalid input: %s', (invalidInput) => {
      expect(isWrappedMessage(invalidInput)).toBe(false)
    })
  })
})
