import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import {
  GreenText,
  PageContainer,
  PageContentContainer,
  PearHand,
  Title
} from './styles'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'

export const InitialLoadPage = () => {
  const { i18n } = useLingui()

  return html`
    <${InitialPageWrapper}>
      <${PageContainer}>
        <${PageContentContainer}>
          <${Title}>
            ${i18n._('Protect')}

            <${GreenText}>${i18n._('your digital')}<//>

            ${i18n._('life')}
          <//>

          <${PearHand} src="assets/images/pearHand.png" alt="pearHand" />
        <//>
      <//>
    <//>
  `
}
