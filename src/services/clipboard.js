/** @typedef {import('pear-interface')} */ /* global Pear */

import { logger } from '../utils/logger'

let lastCopiedValue = ''

/**
 * Sets the last copied value for tracking
 * @param {string} value
 */
export const setLastCopiedValue = (value) => {
  lastCopiedValue = value
}

/**
 * Gets the last copied value
 * @returns {string}
 */
export const getLastCopiedValue = () => lastCopiedValue

/**
 * Clears the last copied value reference
 */
export const clearLastCopiedValue = () => {
  lastCopiedValue = ''
}

/**
 * Clears clipboard if it still contains our copied value
 */
export const clearClipboardIfOurs = async () => {
  if (!lastCopiedValue) {
    return
  }

  try {
    if (!navigator.clipboard) {
      return
    }

    const currentClipboard = await navigator.clipboard.readText()

    if (currentClipboard === lastCopiedValue) {
      await navigator.clipboard.writeText('')
      logger.info('clipboardService', 'Clipboard cleared on app teardown')
    }
  } catch (err) {
    logger.error(
      'clipboardService',
      'Failed to clear clipboard on teardown',
      err
    )
  } finally {
    lastCopiedValue = ''
  }
}

/**
 * Initializes clipboard cleanup on app teardown
 */
export const initClipboardTeardown = () => {
  Pear.teardown(async () => {
    await clearClipboardIfOurs()
  })
}
