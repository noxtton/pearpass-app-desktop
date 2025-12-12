import { useRef, useEffect, useState } from 'react'

import { html } from 'htm/react'

import { IconWrapper, Container, Message } from './styles'
import { ErrorIcon, YellowErrorIcon } from '../../lib-react-components'

/**
 * @param {Object} props
 * @param {string} props.message
 * @param {('warning'|'error')} [props.type='warning']
 * @param {string} [props.testId]
 * @returns {Object}
 */
export const AlertBox = ({ message, type = 'warning', testId }) => {
  const messageRef = useRef(null)
  const [isMultiLine, setIsMultiLine] = useState(false)

  useEffect(() => {
    if (messageRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(messageRef.current).lineHeight
      )
      const height = messageRef.current.offsetHeight
      setIsMultiLine(height > lineHeight * 1.2)
    }
  }, [message])

  return html`
    <${Container}
      type=${type}
      $isMultiLine=${isMultiLine}
      data-testid=${testId}
    >
      <${IconWrapper}>
        <${type === 'warning' ? YellowErrorIcon : ErrorIcon} size="18" />
      <//>

      <${Message} ref=${messageRef}> ${message} <//>
    <//>
  `
}
