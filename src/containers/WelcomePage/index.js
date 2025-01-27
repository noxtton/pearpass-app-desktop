import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useCreateVault } from 'pearpass-lib-vault'

import {
  ActionCardTitle,
  Actions,
  ActionsCard,
  PageContainer,
  PearHand,
  Title
} from './styles'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import { LoadingOverlay } from '../../components/LoadingOverlay'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { LoadVaultModalContent } from '../Modal/LoadVaultModalContent'

export const WelcomePage = () => {
  const { i18n } = useLingui()

  const { setModal } = useModal()
  const { navigate } = useRouter()

  const { isLoading, createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', {
        recordType: 'all'
      })
    }
  })

  const handleLoadVault = () => {
    setModal(html` <${LoadVaultModalContent} /> `, { overlayType: 'blur' })
  }

  return html`
    <${InitialPageWrapper}>
      <${PageContainer}>
        <${Title}>${i18n._('Hi Peer! Welcome to PearPass!')}<//>

        <${ActionsCard}>
          <${ActionCardTitle}>
            ${i18n._('Start with')}
            <br />
            ${i18n._('creating a new vault or importing one')}
          <//>

          <${Actions}>
            <${ButtonPrimary} size="md" onClick=${createVault}>
              ${i18n._('Create a new vault')}
            <//>

            <${ButtonSecondary}
              size="md"
              onClick=${handleLoadVault}
              type="button"
            >
              ${i18n._('Load a vault')}
            <//>
          <//>
        <//>

        <${PearHand} src="assets/images/pearHandBig.png" alt="pearHand" />
      <//>

      ${isLoading && html`<${LoadingOverlay} />`}
    <//>
  `
}
