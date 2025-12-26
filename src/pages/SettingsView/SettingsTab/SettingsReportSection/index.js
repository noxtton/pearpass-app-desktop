import { html } from 'htm/react'

import { ButtonWrapper, Form, StyledInputFieldWrapper } from './styles'
import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import {
  ButtonSecondary,
  InputField,
  TextArea
} from '../../../../lib-react-components'

/**
 * @param {{
 *    onSubmitReport: () => void,
 *    message: string,
 *    title: string,
 *    buttonText: string,
 *    textAreaPlaceholder: string,
 *    textAreaOnChange: (value: string) => void,
 *    subTitle: string,
 *    email: string,
 *    emailPlaceholder: string,
 *    onEmailChange: (value: string) => void,
 *    emailError?: string
 *  }} props
 */
export const SettingsReportSection = ({
  onSubmitReport,
  message,
  title,
  buttonText,
  textAreaPlaceholder,
  textAreaOnChange,
  subTitle,
  email,
  emailPlaceholder,
  onEmailChange,
  emailError
}) => html`
  <${CardSingleSetting} title=${title}>
    ${subTitle && html`${subTitle}`}
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

      <${StyledInputFieldWrapper}>
        <${InputField}
          value=${email}
          onChange=${(value) => onEmailChange(value)}
          variant="default"
          placeholder=${emailPlaceholder}
          error=${emailError}
        />
      <//>
      <${ButtonWrapper}>
        <${ButtonSecondary} type="submit"> ${buttonText} <//>
      <//>
    <//>
  <//>
`
