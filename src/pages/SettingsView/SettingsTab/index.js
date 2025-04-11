import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'
import { ButtonSecondary, TextArea } from 'pearpass-lib-ui-react-components'

import { ButtonWrapper, Form } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
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
        appVersion: '0.0.1'
      }

      await sendSlackFeedback({
        webhookUrPath: '/T1RUJ063F/B08LLRLBY9M/KTKA3MIJfmjX4izWfgnjbRIM',
        ...payload
      })

      await sendGoogleFormFeedback({
        formKey: '1FAIpQLScLltvRe64VzMDRzOVjGtHWZ3KafLC2zzvkEoJfTzJkFd67OA',
        mapping: {
          timestamp: 'entry.34343954',
          topic: 'entry.302384538',
          app: 'entry.536199007',
          operatingSystem: 'entry.1717180794',
          deviceModel: 'entry.536951034',
          message: 'entry.9561956',
          appVersion: 'entry.156031897'
        },
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
