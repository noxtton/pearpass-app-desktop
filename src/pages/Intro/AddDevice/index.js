import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useCountDown } from 'pear-apps-lib-ui-react-hooks'
import {
  ButtonRoundIcon,
  TimeIcon,
  UserSecurityIcon,
  XIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  Container,
  Content,
  ExpireText,
  ExpireTime,
  Header,
  LeftSide,
  QrImage,
  Text
} from './styles'

export const AddDevice = () => {
  const { i18n } = useLingui()

  const expireTime = useCountDown({
    initialSeconds: 120
  })

  return html`
    <${Container}>
      <${Header}>
        <${LeftSide}>
          <${UserSecurityIcon} size="24" color=${colors.white.mode1} />
          <${Text}> ${i18n._('Add Device')} <//>
        <//>
        <${ButtonRoundIcon} startIcon=${XIcon} />
      <//>
      <${Content}>
        <${Text}> ${i18n._('Scan this QR code')} <//>
        <${QrImage} src="assets/images/AddDeviceQr.png" />
      <//>

      <${ExpireText}>
        ${i18n._('This link will expire in')}
        <${ExpireTime}> ${expireTime} <//>
        <${TimeIcon} size="24" color=${colors.primary400.mode1} />
      <//>
    <//>
  `
}
