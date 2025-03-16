import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useCountDown } from 'pear-apps-lib-ui-react-hooks'
import { generateQRCodeSVG } from 'pear-apps-utils-qr'
import {
  CopyIcon,
  TimeIcon,
  UserSecurityIcon,
  YellowErrorIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useCreateInvite } from 'pearpass-lib-vault'

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

export const AddDeviceModalContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const [qrSvg, setQrSvg] = useState('')
  const { createInvite, data } = useCreateInvite()

  const expireTime = useCountDown({
    initialSeconds: 120,
    onFinish: closeModal
  })

  const { copyToClipboard, isCopied } = useCopyToClipboard()

  useEffect(() => {
    createInvite()
  }, [])

  useEffect(() => {
    if (data?.publicKey) {
      generateQRCodeSVG(data?.publicKey, { type: 'svg', margin: 0 }).then(
        (value) => setQrSvg(value)
      )
    }
  }, [data])

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

          <${QRCode}
            style=${{ width: '200px', height: '200px' }}
            dangerouslySetInnerHTML=${{ __html: qrSvg }}
          />
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
