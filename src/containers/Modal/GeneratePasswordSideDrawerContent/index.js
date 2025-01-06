import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonLittle } from 'pearpass-lib-ui-react-components'

import { Header, HeaderButtonWrapper, Wrapper } from './styles'
import { HighlightString } from '../../../components/HighlightString'
import { ModalHeader } from '../ModalHeader'

/**
 * @param {{
 *  onClose: () => void
 * }} props
 */
export const GeneratePasswordSideDrawerContent = ({ onClose }) => {
  const { i18n } = useLingui()

  return html`
    <${Wrapper}>
      <${ModalHeader} onClose=${onClose}>
        <${HeaderButtonWrapper}>
          <${ButtonLittle}> ${i18n._('Insert password')} <//>
        <//>
      <//>

      <${Header}>
        <${HighlightString}
          text="Stench6-Taco2-Manicotti7-Velocity9-Serotonin5 )0Ag;"
        />
      <//>
    <//>
  `
}
