import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ArrowLeftIcon, ButtonLittle } from 'pearpass-lib-ui-react-components'

import { NavBar, Wrapper } from './styles'
import { SettingsReportProblem } from '../../components/SettingsReportProblem'
import { useRouter } from '../../context/RouterContext'

export const SettingsView = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const handleGoBack = () => {
    navigate('vault', {
      recordType: 'all'
    })
  }

  return html`
    <${Wrapper}>
      <${NavBar}>
        <${ButtonLittle}
          onClick=${handleGoBack}
          variant="secondary"
          startIcon=${ArrowLeftIcon}
        />

        ${i18n._('Settings')}
      <//>

      <${SettingsReportProblem} />
    <//>
  `
}
