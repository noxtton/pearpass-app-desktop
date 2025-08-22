import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonRadio, ButtonSecondary } from 'pearpass-lib-ui-react-components'
import { useUserData } from 'pearpass-lib-vault'

import { TextWrapper, TouCard, TouUnderline } from './styles'
import { TouModalContent } from './TouModalContent'
import { LOCAL_STORAGE_KEYS } from '../../constants/localStorage'
import { BaseInitialPage } from '../../containers/BaseInitialPage'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'

export const TouPage = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()
  const { setModal } = useModal()

  const { refetch: refetchUser } = useUserData()

  const [isSelected, setIsSelected] = useState(false)

  const handleAccept = () => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOU_ACCEPTED, 'true')
    setIsSelected(true)
  }

  const onContinue = async () => {
    const userData = await refetchUser()

    navigate('welcome', {
      state: userData?.hasPasswordSet
        ? 'masterPassword'
        : 'createMasterPassword'
    })
  }

  const showTouModal = () => {
    setModal(html`<${TouModalContent} />`)
  }

  return html`
    <${BaseInitialPage}>
      <${TouCard}>
        ${html`<${ButtonRadio}
          isActive=${isSelected}
          onClick=${handleAccept}
        />`}
        <${TextWrapper}>
          <div>
            ${i18n._('I have read and agree to the')}${' '}
            <${TouUnderline} onClick=${showTouModal}>
              ${i18n._('PearPass Application Terms of Use')}
            <//>
          </div>
          <div>
            ${i18n._(
              'I understand that losing my master password will mean losing access to all of the content stored in PearPass.'
            )}
          </div>
          <${ButtonSecondary} disabled=${!isSelected} onClick=${onContinue}>
            ${i18n._('Continue')}
          <//>
        <//>
      <//>
    <//>
  `
}
