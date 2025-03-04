import { useEffect } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  CopyIcon,
  TimeIcon,
  UserSecurityIcon,
  YellowErrorIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useCreateInvite } from 'pearpass-lib-vault-desktop'

import { FormModalHeaderWrapper } from '../../../components/FormModalHeaderWrapper'
import { useModal } from '../../../context/ModalContext'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'
import { ModalContent } from '../ModalContent'
import {
  BackgroundSection,
  Content,
  CopyText,
  ExpireText,
  ExpireTime,
  HeaderTitle,
  IconWrapper,
  QRCode,
  QRCodeCopy,
  QRCodeCopyWrapper,
  QRCodeSection,
  QRCodeText,
  WarningSection,
  WarningText
} from './styles'
import useCountDown from '../../../hooks/useCountDown'

export const AddDeviceModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const { createInvite, data } = useCreateInvite()

  const expireTime = useCountDown({
    initialSeconds: 120,
    onFinish: closeModal
  })

  const { copyToClipboard, isCopied } = useCopyToClipboard()

  useEffect(() => {
    createInvite()
  }, [])

  return html`
    <${ModalContent}
      onClose=${closeModal}
      headerChildren=${html`
        <${FormModalHeaderWrapper}>
          <${HeaderTitle}>
            <${UserSecurityIcon} />

            ${i18n._('Add a device')}
          <//>
        <//>
      `}
    >
      <${Content}>
        <${QRCodeSection}>
          <${QRCodeText}> ${i18n._('Scan this QR code')} <//>

          <${QRCode} src="assets/images/qr-code.png" />
        <//>

        <${BackgroundSection}>
          <${ExpireText}>
            ${i18n._('This link will expire in')}
            <${ExpireTime}> ${expireTime} <//>
          <//>

          <${IconWrapper}>
            <${TimeIcon} color=${colors.primary400.mode1} />
          <//>
        <//>

        <${BackgroundSection} onClick=${() => copyToClipboard(data?.publicKey)}>
          <${QRCodeCopyWrapper}>
            <${QRCodeCopy}>
              <${QRCodeText}> ${i18n._('Copy accont link')} <//>
              <${IconWrapper}>
                <${CopyIcon} color=${colors.primary400.mode1} />
              <//>
            <//>
            <${CopyText}> ${isCopied ? i18n._('Copied!') : data?.publicKey} <//>
          <//>
        <//>

        <${WarningSection}>
          <${IconWrapper}>
            <${YellowErrorIcon} />
          <//>

          <${WarningText}>
            ${i18n._(
              'Caution: You’re generating a secure invitation to sync another device with your vault. Treat this invite with the same confidentiality as your password.'
            )}
          <//>
        <//>
      <//>
    <//>
  `
}
