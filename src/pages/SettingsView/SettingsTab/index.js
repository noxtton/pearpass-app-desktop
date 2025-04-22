import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'
import { ButtonSecondary, TextArea } from 'pearpass-lib-ui-react-components'

import { ButtonWrapper, Form } from './styles'
import { version } from '../../../../package.json'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import {
  GOOGLE_FORM_KEY,
  GOOGLE_FORM_MAPPING,
  SLACK_WEBHOOK_URL_PATH
} from '../../../constants/feedback'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useToast } from '../../../context/ToastContext'

export const SettingsTab = () => {
  const { i18n } = useLingui()
  const { setToast } = useToast()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const handleReportProblem = async () => {
    if (!message?.length || isLoading) {
      return
    }

    try {
      setIsLoading(true)

      const payload = {
        message,
        topic: 'BUG_REPORT',
        app: 'DESKTOP',
        operatingSystem: navigator?.userAgentData?.platform,
        deviceModel: navigator?.platform,
        appVersion: version
      }

      await sendSlackFeedback({
        webhookUrPath: SLACK_WEBHOOK_URL_PATH,
        ...payload
      })

      await sendGoogleFormFeedback({
        formKey: GOOGLE_FORM_KEY,
        mapping: GOOGLE_FORM_MAPPING,
        ...payload
      })

      setMessage('')

      setIsLoading(false)

      setToast({
        message: i18n._('Feedback sent')
      })
    } catch (error) {
      setIsLoading(false)

      setToast({
        message: i18n._('Something went wrong, please try again')
      })

      console.error('Error sending feedback:', error)
    }
  }

  return html`
    <${CardSingleSetting} title=${i18n._('Report a problem')}>
      <${Form}
        onSubmit=${(e) => {
          e.preventDefault()
          handleReportProblem()
        }}
      >
        <${TextArea}
          value=${message}
          onChange=${(value) => setMessage(value)}
          variant="report"
          placeholder=${i18n._('Write your issue...')}
        />

        <${ButtonWrapper}>
          <${ButtonSecondary} type="submit"> ${i18n._('send')} <//>
        <//>
      <//>
    <//>
  `
}
