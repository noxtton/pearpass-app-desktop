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
    <${CardSingleSetting} title=${i18n._('Personalization')}>
      <${Description}>
        ${i18n._(
          'Here you can choose your privacy settings and personalize your experience'
        )}
      <//>

      <${SwitchList}>
        <${SwitchWrapper}>
          <${Switch}
            isOn=${isBrowserExtensionEnabled}
            onChange=${(isOn) => toggleBrowserExtension(isOn)}
          ><//>
          ${i18n._('Active Browser extension')}
        <//>
      <//>
    <//>
  `
}
