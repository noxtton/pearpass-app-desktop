import React, { useState, useRef } from 'react'

/**
 * @returns {{
 *  isCopied: boolean,
 *  copyToClipboard: (text: string) => boolean
 * }}
 */
export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)
  const timeoutRef = useRef()

  const copyToClipboard = React.useCallback((text) => {
    if (!navigator.clipboard) {
      console.error('Clipboard API is not available')
      return false
    }

    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true)

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => setIsCopied(false), 2000)
      },
      (err) => {
        console.error('Failed to copy text to clipboard', err)
      }
    )

    return true
  }, [])

  return { isCopied, copyToClipboard }
}
