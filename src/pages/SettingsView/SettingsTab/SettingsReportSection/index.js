import { html } from 'htm/react'
import { ButtonSecondary, TextArea } from 'pearpass-lib-ui-react-components'

import { ButtonWrapper, Form } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'

/**
 * @param {{
 *    onSubmitReport: () => void,
 *    message: string,
 *    title: string,
 *    buttonText: string,
 *    textAreaPlaceholder: string,
 *    textAreaOnChange: (value: string) => void
 *  }} props
 */
export const SettingsReportSection = ({
  onSubmitReport,
  message,
  title,
  buttonText,
  textAreaPlaceholder,
  textAreaOnChange
}) => html`
  <${CardSingleSetting} title=${title}>
    <${Form}
      onSubmit=${(e) => {
        e.preventDefault()
        onSubmitReport()
      }}
    >
      <${TextArea}
        value=${message}
        onChange=${(value) => textAreaOnChange(value)}
        variant="report"
        placeholder=${textAreaPlaceholder}
      />
      <${ButtonWrapper}>
        <${ButtonSecondary} type="submit"> ${buttonText} <//>
      <//>
    <//>
  <//>
`
