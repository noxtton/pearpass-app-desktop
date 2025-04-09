import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary, TextArea } from 'pearpass-lib-ui-react-components'

import { CardSingleSetting } from '../CardSingleSetting'
import { ButtonWrapper, content } from './styles'

export const SettingsTab = () => {
  const { i18n } = useLingui()

  return html`
    <${CardSingleSetting} title=${i18n._('Report a problem')}>
      <${content}>
        <${TextArea}
          variant="report"
          placeholder=${i18n._('Write your issue...')}
        />
        <${ButtonWrapper}>
          <${ButtonSecondary}> ${i18n._('send')} <//>
        <//>
      <//>
    <//>
  `
}
