import React, { useState, useRef } from 'react'

import { logger } from '../utils/logger'

/**
 * @param {{
 *  onCopy?: () => void
 * }} props
 * @returns {{
 *  isCopied: boolean,
 *  copyToClipboard: (text: string) => boolean
 * }}
 */
export const useCopyToClipboard = ({ onCopy } = {}) => {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef()

  const copyToClipboard = React.useCallback((text) => {
    if (!navigator.clipboard) {
      logger.error('useCopyToClipboard', 'Clipboard API is not available')
      return false
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true)

        onCopy?.()

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
      },
      (err) => {
        logger.error(
          'useCopyToClipboard',
          'Failed to copy text to clipboard',
          err
        )
      }
    )

    return true
  }, [])

  return { isCopied, copyToClipboard }
}
