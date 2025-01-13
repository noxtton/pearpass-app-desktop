import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary, TextArea } from 'pearpass-lib-ui-react-components'

import { ReportSection, ReportSeparator, ReportTitle } from './styles'

export const SettingsReportProblem = () => {
  const { i18n } = useLingui()

  return html`
    <${ReportSection}>
      <${ReportTitle}>${i18n._('Report a problem')} <//>

      <${ReportSeparator} />

      <${TextArea}
        variant="report"
        placeholder=${i18n._('Write your issue...')}
      />

      <${ButtonSecondary}> ${i18n._('send')} <//>
    <//>
  `
}
