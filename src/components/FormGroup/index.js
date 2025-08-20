import { useState } from 'react'

import { html } from 'htm/react'
import { ArrowDownIcon, ArrowUpIcon } from 'pearpass-lib-ui-react-components'

import { Collapse, TitleWrapper, Wrapper } from './styles'

/**
 * @param {{
 *  title: string,
 *  isCollapse: boolean
 *  defaultOpenState: boolean
 *  children: import('react').ReactNode
 * }} props
 */
export const FormGroup = ({
  title,
  isCollapse,
  children,
  defaultOpenState = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState)

  if (!children) {
    return
  }

  return html`
    <${Wrapper}>
      ${!!title?.length &&
      isCollapse &&
      html`
        <${TitleWrapper} onClick=${() => setIsOpen(!isOpen)}>
          <${isOpen ? ArrowUpIcon : ArrowDownIcon} />
          ${title}
        <//>
      `}
      ${isOpen && html` <${Collapse}> ${children} <//> `}
    <//>
  `
}
