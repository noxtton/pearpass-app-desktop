import { html } from 'htm/react'

import { Buttons, FormModalHeaderWrapperComponent, Main } from './styles'

/**
 * @param {{
 *  children: import('react').ReactNode,
 *  buttons: import('react').ReactNode
 * }} props
 */
export const FormModalHeaderWrapper = ({ children, buttons }) => {
  return html` <${FormModalHeaderWrapperComponent}>
    <${Main}> ${children} <//>
    <${Buttons}> ${buttons} <//>
  <//>`
}
