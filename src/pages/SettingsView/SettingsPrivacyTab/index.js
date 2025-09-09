import { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { Switch } from 'pearpass-lib-ui-react-components'

import { SwitchList, SwitchWrapper } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorage'
import { RuleSelector } from '../../../containers/Modal/GeneratePasswordSideDrawerContent/RuleSelector'
import { useConnectExtension } from '../../../hooks/useConnectExtension'
import { Description } from '../ExportTab/styles'

export const SettingsPrivacyTab = () => {
  const { i18n } = useLingui()
  const { isBrowserExtensionEnabled, toggleBrowserExtension } =
    useConnectExtension()

  const [selectedRules, setSelectedRules] = useState(() => {
    const isEnabled = localStorage.getItem(
      LOCAL_STORAGE_KEYS.COPY_TO_CLIPBOARD_ENABLED
    )

    return {
      copyToClipboard: isEnabled === 'true'
    }
  })

  const ruleOptions = useMemo(() => {
    const options = [
      {
        name: 'copyToClipboard',
        label: i18n._('Copy to clipboard'),
        description: i18n._(
          'When clicking a password you copy that into your clipboard'
        )
      }
    ]

    return options
  }, [i18n])

  const handleSetRules = (newRules) => {
    if (newRules.copyToClipboard !== selectedRules.copyToClipboard) {
      if (newRules.copyToClipboard) {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.COPY_TO_CLIPBOARD_ENABLED,
          'true'
        )
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.COPY_TO_CLIPBOARD_ENABLED)
      }
    }

    setSelectedRules({ ...newRules })
  }

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
        <${RuleSelector}
          rules=${ruleOptions}
          selectedRules=${selectedRules}
          isSwitchFirst
          stretch=${false}
          setRules=${handleSetRules}
        />
      <//>
    <//>
  `
}
