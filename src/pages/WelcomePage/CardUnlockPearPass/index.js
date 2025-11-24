import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useVaults } from 'pearpass-lib-vault'

import { AlertBox } from '../../../components/AlertBox'
import { AuthenticationCard } from '../../../components/AuthenticationCard'
import { useRouter } from '../../../context/RouterContext'

export const CardUnlockPearPass = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const { initVaults } = useVaults()

  const handleSuccess = async (password) => {
    await initVaults({ password })
    navigate(currentPage, { state: 'vaults' })
  }

  return html`
    <${AuthenticationCard}
      title=${i18n._('Enter your Master password')}
      buttonLabel=${i18n._('Continue')}
      descriptionComponent=${html`<${AlertBox}
        message=${i18n._(
          'Don’t forget your master password. It’s the only way to access your vault. We can’t help recover it. Back it up securely.'
        )}
      />`}
      onSuccess=${handleSuccess}
    />
  `
}
