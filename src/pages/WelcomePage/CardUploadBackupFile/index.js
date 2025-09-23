import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { Header, UploadFileTitle, Wrapper } from './styles'
import { FileUploadContent } from '../../../components/FileUploadContent'
import { useRouter } from '../../../context/RouterContext'
import { ArrowLeftIcon, ButtonLittle } from '../../../lib-react-components'

export const CardUploadBackupFile = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const handleGoBack = () => {
    navigate('welcome', { state: 'vaults' })
  }

  return html` <${Wrapper}>
    <${Header}>
      <${ButtonLittle}
        onClick=${handleGoBack}
        variant="secondary"
        startIcon=${ArrowLeftIcon}
      />
      <${UploadFileTitle}>${i18n._('Upload the backup file')}<//>
    <//>
    <${FileUploadContent} />
  <//>`
}
