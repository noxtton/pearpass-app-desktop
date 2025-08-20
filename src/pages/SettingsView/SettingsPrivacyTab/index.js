import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { Switch } from 'pearpass-lib-ui-react-components'

import { SwitchList, SwitchWrapper } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { useConnectExtension } from '../../../hooks/useConnectExtension'
import { Description } from '../ExportTab/styles'

export const SettingsPrivacyTab = () => {
  const { i18n } = useLingui()
  const { isBrowserExtensionEnabled, toggleBrowserExtension } =
    useConnectExtension()

  return html`
    <${CardSingleSetting} title=${i18n._('Browser Extension')}>
      <${Description}>
        ${i18n._(
          'Connect your browser extension to enable secure communication with PearPass.'
        )}
      <//>

      <${SwitchList}>
        <${SwitchWrapper}>
          <${Switch}
            isOn=${isBrowserExtensionEnabled}
            onChange=${(isOn) => toggleBrowserExtension(isOn)}
          ><//>
          ${i18n._('Enable Browser Extension Integration')}
        <//>
      <//>
    <//>
  `
}
