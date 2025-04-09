import { html } from 'htm/react'
import { PlusIcon, XIcon } from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { Button } from './styles'

/**
 * @param {{
 *  isOpen: boolean
 * }} props
 */
export const ButtonPlusCreateNew = ({ isOpen }) => html`
  <${Button}>
    <${isOpen ? XIcon : PlusIcon} color=${colors.black.mode1} />
  <//>
`
