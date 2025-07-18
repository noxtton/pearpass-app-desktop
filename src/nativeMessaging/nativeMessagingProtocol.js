/**
 * Custom protocol wrapper for native messaging to work around Chrome bugs
 * 
 * Chrome's native messaging has a bug where it sometimes sends incorrect
 * length headers, especially for messages of certain sizes (e.g., 255 bytes).
 * 
 * This wrapper adds a custom length field inside the message for integrity validation
 */

/**
 * Wrap a message with our custom protocol
 * @param {Object} message - The original message
 * @returns {Object} The wrapped message
 */
export function wrapMessage(message) {
  // Convert message to JSON and calculate its length
  const originalJson = JSON.stringify(message);
  const originalLength = Buffer.from(originalJson).length;
  
  // Create wrapped message with length metadata
  const wrapped = {
    _length: originalLength,
    _message: message
  };
  
  return wrapped;
}

/**
 * Unwrap a message from our custom protocol
 * @param {Object} wrapped - The wrapped message
 * @returns {Object|null} The original message or null if invalid
 */
export function unwrapMessage(wrapped) {
  // Validate structure
  if (!wrapped || typeof wrapped !== 'object' || !wrapped._message || typeof wrapped._length !== 'number') {
    console.error('[Protocol] Invalid message structure');
    return null;
  }
  
  // Validate length strictly
  const messageJson = JSON.stringify(wrapped._message);
  const actualLength = Buffer.from(messageJson).length;
  
  if (actualLength !== wrapped._length) {
    console.error('[Protocol] Length mismatch - expected:', wrapped._length, 'actual:', actualLength);
    return null;
  }
  
  return wrapped._message;
}

/**
 * Check if a message uses our protocol
 * @param {Object} message - The message to check
 * @returns {boolean} True if it's a wrapped message
 */
export function isWrappedMessage(message) {
  return message && 
         typeof message === 'object' && 
         '_length' in message &&
         '_message' in message;
}
