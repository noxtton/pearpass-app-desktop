import React, { useState, useRef, useEffect } from 'react'

import { LOCAL_STORAGE_KEYS } from '../constants/localStorage'
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
  const [isCopyToClipboardEnabled, setIsCopyToClipboardEnabled] =
    useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef()

  useEffect(() => {
    const checkCopyToClipboardEnabled = () => {
      const isEnabled = localStorage.getItem(
        LOCAL_STORAGE_KEYS.COPY_TO_CLIPBOARD_ENABLED
      )

      setIsCopyToClipboardEnabled(isEnabled === 'true')
    }

    checkCopyToClipboardEnabled()
  }, [])

  const copyToClipboard = React.useCallback(
    (text) => {
      if (!isCopyToClipboardEnabled) {
        return false
      }

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
    },
    [isCopyToClipboardEnabled]
  )

  return { isCopied, copyToClipboard }
}
