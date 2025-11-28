import React, { useState, useRef, useEffect } from 'react'

import { CLIPBOARD_CLEAR_TIMEOUT } from 'pearpass-lib-constants'

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
  const [isCopyToClipboardDisabled, setIsCopyToClipboardDisabled] =
    useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const copiedValueRef = useRef('')
  const clearTimerRef = useRef(null)
  const timeoutRef = useRef()

  useEffect(() => {
    const checkCopyToClipboardDisabled = () => {
      const isDisabled = localStorage.getItem(
        LOCAL_STORAGE_KEYS.COPY_TO_CLIPBOARD_DISABLED
      )

      setIsCopyToClipboardDisabled(isDisabled === 'true')
    }

    checkCopyToClipboardDisabled()
  }, [])

  const copyToClipboard = React.useCallback(
    (text) => {
      if (isCopyToClipboardDisabled) {
        return false
      }

      if (!navigator.clipboard) {
        logger.error('useCopyToClipboard', 'Clipboard API is not available')
        return false
      }

      navigator.clipboard.writeText(text).then(
        () => {
          copiedValueRef.current = text
          setIsCopied(true)

          onCopy?.()

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          timeoutRef.current = setTimeout(() => setIsCopied(false), 2000)

          if (clearTimerRef.current) {
            clearTimeout(clearTimerRef.current)
          }

          clearTimerRef.current = setTimeout(async () => {
            try {
              const currentClipboard = await navigator.clipboard.readText()

              if (currentClipboard === copiedValueRef.current) {
                await navigator.clipboard.writeText('')
              }
            } catch (err) {
              logger.error(
                'useCopyToClipboard',
                'Failed to auto-clear clipboard',
                err
              )
            }
          }, CLIPBOARD_CLEAR_TIMEOUT)
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
    [isCopyToClipboardDisabled]
  )

  return { isCopied, copyToClipboard }
}
