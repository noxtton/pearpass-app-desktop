import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'

import { SettingsLanguageSection } from './SettingsLanguageSection'
import { SettingsReportSection } from './SettingsReportSection'
import { VersionWrapper } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import {
  GOOGLE_FORM_KEY,
  GOOGLE_FORM_MAPPING,
  SLACK_WEBHOOK_URL_PATH
} from '../../../constants/feedback'
import { LANGUAGES } from '../../../constants/languages'
import { VERSION } from '../../../constants/version'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useToast } from '../../../context/ToastContext'
import { logger } from '../../../utils/logger'

export const SettingsTab = () => {
  const { i18n } = useLingui()
  const { setToast } = useToast()

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState(i18n.locale)

  useGlobalLoading({ isLoading })

  const handleLanguageChange = (selected) => {
    setLanguage(selected.value)
    i18n.activate(selected.value)
  }

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
        appVersion: VERSION
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

      logger.error('Error sending feedback:', error)
    }
  }

  const selectedLangItem = LANGUAGES.find((l) => l.value === language)

  return html`
    <${SettingsLanguageSection}
      selectedItem=${selectedLangItem}
      onItemSelect=${handleLanguageChange}
      placeholder=${i18n._('Select')}
      title=${i18n._('Language')}
    />

    <${SettingsReportSection}
      onSubmitReport=${handleReportProblem}
      message=${message}
      title=${i18n._('Report a problem')}
      buttonText=${i18n._('send')}
      textAreaPlaceholder=${i18n._('Write your issue...')}
      textAreaOnChange=${setMessage}
    />

    <${CardSingleSetting} title=${i18n._('Version')}>
      <${VersionWrapper}> ${VERSION} <//>
    <//>
  `
}
