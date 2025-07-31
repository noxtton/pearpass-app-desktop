/**
 * Protocol wrapper for native messaging
 */

/**
 * Wrap a message with protocol metadata
 */
function wrapMessage(message) {
  const originalJson = JSON.stringify(message)
  const originalLength = Buffer.from(originalJson).length

  return {
    length: originalLength,
    message: message
  }
}

/**
 * Unwrap a message from protocol
 */
function unwrapMessage(wrapped) {
  if (!wrapped || typeof wrapped !== 'object' || !wrapped.message || typeof wrapped.length !== 'number') {
    return null
  }

  const messageJson = JSON.stringify(wrapped.message)
  const actualLength = Buffer.from(messageJson).length

  if (actualLength !== wrapped.length) {
    return null
  }

  return wrapped.message
}

/**
 * Check if a message is wrapped
 */
function isWrappedMessage(message) {
  return !!message && typeof message === 'object' && 'length' in message && 'message' in message
}

module.exports = {
  wrapMessage,
  unwrapMessage,
  isWrappedMessage
}
