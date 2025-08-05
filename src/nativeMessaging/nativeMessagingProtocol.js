/**
 * Custom protocol wrapper for native messaging to work around Chrome bugs
 *
 * Chrome's native messaging has a bug where it sometimes sends incorrect
 * length headers, especially for messages of certain sizes (e.g., 255 bytes).
 *
 * This wrapper adds a custom length field inside the message for integrity validation
 */

import { logger } from '../utils/logger.js'

/**
 * Wrap a message with our custom protocol
 * @param {Object} message - The original message
 * @returns {Object} The wrapped message
 */
export const wrapMessage = (message) => {
  // Convert message to JSON and calculate its length
  const originalJson = JSON.stringify(message)
  const originalLength = Buffer.from(originalJson).length

  // Create wrapped message with length metadata
  const wrapped = {
    length: originalLength,
    message: message
  }

  return wrapped
}

/**
 * Unwrap a message from our custom protocol
 * @param {Object} wrapped - The wrapped message
 * @returns {Object|null} The original message or null if invalid
 */
export const unwrapMessage = (wrapped) => {
  // Validate structure
  if (
    !wrapped ||
    typeof wrapped !== 'object' ||
    !wrapped.message ||
    typeof wrapped.length !== 'number'
  ) {
    logger.error('[Protocol] Invalid message structure')
    return null
  }

  // Validate length strictly
  const messageJson = JSON.stringify(wrapped.message)
  const actualLength = Buffer.from(messageJson).length

  if (actualLength !== wrapped.length) {
    logger.error(
      '[Protocol] Length mismatch - expected:',
      wrapped.length,
      'actual:',
      actualLength
    )
    return null
  }

  return wrapped.message
}

/**
 * Check if a message uses our protocol
 * @param {Object} message - The message to check
 * @returns {boolean} True if it's a wrapped message
 */
export const isWrappedMessage = (message) =>
  !!message &&
  typeof message === 'object' &&
  !!('length' in message) &&
  !!('message' in message)
