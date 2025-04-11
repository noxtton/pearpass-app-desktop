import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'
import { useCreateVault } from 'pearpass-lib-vault'

import { ActionCardTitle, Actions, CardContainer } from './styles'
import { LoadVaultModalContent } from '../../../containers/Modal/LoadVaultModalContent'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useModal } from '../../../context/ModalContext'
import { useRouter } from '../../../context/RouterContext'

export const CardCreateOrLoadVault = () => {
  const { i18n } = useLingui()

  const { setModal } = useModal()
  const { navigate } = useRouter()

  const { isLoading, createVault } = useCreateVault({
    onCompleted: () => {
      navigate('vault', { recordType: 'all' })
    }
  })

  useGlobalLoading({ isLoading })

  const handleLoadVault = () => {
    setModal(html` <${LoadVaultModalContent} /> `, { overlayType: 'blur' })
  }

  const handleCreateVault = async () => {
    if (isLoading) {
      return
    }

    await createVault()
  }

  return html` <${CardContainer}>
    <${ActionCardTitle}>
      ${i18n._('Start with')}
      <br />
      ${i18n._('creating a new vault or importing one')}
    <//>

    <${Actions}>
      <${ButtonPrimary} size="md" onClick=${handleCreateVault}>
        ${i18n._('Create a new vault')}
      <//>

      <${ButtonSecondary} size="md" onClick=${handleLoadVault} type="button">
        ${i18n._('Load a vault')}
      <//>
    <//>
  <//>`
}
