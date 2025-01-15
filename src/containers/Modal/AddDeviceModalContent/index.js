import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  CopyIcon,
  TimeIcon,
  UserSecurityIcon,
  YellowErrorIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

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
  QRCodeSection,
  QRCodeText,
  WarningSection,
  WarningText
} from './styles'
import useCountDown from '../../../hooks/useCountDown'

const URL =
  'pear://pearpass/yrd19ra5p8ef5tkdqfhozjyt1szxesnqworcbbw4gzmxxmhf8zpjy9sl48q49hesbr99yet6sj3gkgbwub5w4sjsw5nq3cexmg8sqn378ksp1gd8'

export const AddDeviceModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const expireTime = useCountDown({
    initialSeconds: 120,
    onFinish: closeModal
  })

  const { copyToClipboard, isCopied } = useCopyToClipboard()

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
          <${QRCodeText}> ${i18n._('This device’s QR code')} <//>

          <${QRCode} src="assets/images/qr-code.png" />

          <${QRCodeText}> ${i18n._('or copy account link')} <//>
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

        <${BackgroundSection} onClick=${() => copyToClipboard(URL)}>
          <${CopyText}> ${i18n._(isCopied ? 'Copied!' : URL)} <//>

          <${IconWrapper}>
            <${CopyIcon} color=${colors.primary400.mode1} />
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
