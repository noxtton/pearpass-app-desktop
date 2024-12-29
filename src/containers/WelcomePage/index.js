import { html } from 'htm/react'

import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import {
  ActionCardTitle,
  Actions,
  ActionsCard,
  LoadVaultCard,
  LoadVaultInput,
  LoadVaultTitle,
  PageContainer,
  PearHand,
  Title
} from './styles'
import { useLingui } from '@lingui/react'
import { useModal } from '../../context/ModalContext'
import { ModalOverlay } from '../../components/ModalOverlay'
import { useRouter } from '../../context/RouterContext'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'

export const InitialWelcomePage = () => {
  const { i18n } = useLingui()

  const { openModal, isOpen } = useModal()
  const { navigate } = useRouter()

  const handleNewVaultCreation = () => {
    navigate('vault')
  }

  return html`
    <${InitialPageWrapper}>
      <${PageContainer}>
        <${Title}>${i18n._('Hi Peer! Welcome to PearPass!')}<//>

        ${!isOpen &&
        html`
          <${ActionsCard}>
            <${ActionCardTitle}>
              ${i18n._('Start with')}
              <br />
              ${i18n._('creating a new vault or importing one')}
            <//>

            <${Actions}>
              <${ButtonPrimary} size="md" onClick=${handleNewVaultCreation}>
                ${i18n._('Create a new vault')}
              <//>

              <${ButtonSecondary} size="md" onClick=${openModal} type="button">
                ${i18n._('Load a vault')}
              <//>
            <//>
          <//>
        `}

        <${PearHand} src="assets/images/pearHandBig.png" alt="pearHand" />
      <//>

      <${ModalOverlay} blur=${'10px'}>
        <${LoadVaultCard}>
          <${LoadVaultTitle}>${i18n._('Load an existing Vault')}<//>

          <${LoadVaultInput}
            placeholder=${i18n._('Insert your code vault...')}
          />
        <//>
      <//>
    <//>
  `
}
