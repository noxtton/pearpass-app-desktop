import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'
import { Validator } from 'pear-apps-utils-validator'

import { SettingsDevicesSection } from './SettingsDevicesSection'
import { SettingsLanguageSection } from './SettingsLanguageSection'
import { SettingsPasswordsSection } from './SettingsPasswordsSection'
import { SettingsReportSection } from './SettingsReportSection'
import { SubTitle, VersionWrapper } from './styles'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import {
  GOOGLE_FORM_KEY,
  GOOGLE_FORM_MAPPING,
  SLACK_WEBHOOK_URL_PATH
} from '../../../constants/feedback'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useToast } from '../../../context/ToastContext'
import { useLanguageOptions } from '../../../hooks/useLanguageOptions'
import { logger } from '../../../utils/logger'

export const SettingsTab = () => {
  const { i18n } = useLingui()
  const { setToast } = useToast()

  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState(i18n.locale)
  const [currentVersion, setCurrentVersion] = useState('')

  const { languageOptions } = useLanguageOptions()

  const emailValidator = Validator.string().email(
    i18n._('Invalid email format')
  )

  const handleEmailChange = (value) => {
    setEmail(value)
    if (value) {
      const error = emailValidator.validate(value)
      setEmailError(error || '')
    } else {
      setEmailError('')
    }
  }

  useGlobalLoading({ isLoading })

  const handleLanguageChange = (selected) => {
    setLanguage(selected.value)
    i18n.activate(selected.value)
  }

  const handleReportProblem = async () => {
    if (!message?.length || isLoading) {
      return
    }

    // Validate email if provided
    if (email) {
      const error = emailValidator.validate(email)
      if (error) {
        setEmailError(error)
        return
      }
    }

    try {
      setIsLoading(true)

      const payload = {
        message,
        topic: 'BUG_REPORT',
        app: 'DESKTOP',
        operatingSystem: navigator?.userAgentData?.platform,
        deviceModel: navigator?.platform,
        appVersion: currentVersion
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
      setEmail('')
      setEmailError('')

      setIsLoading(false)

      setToast({
        message: i18n._('Feedback sent')
      })
    } catch (error) {
      setIsLoading(false)

      setToast({
        message: i18n._('Something went wrong, please try again')
      })

      logger.error('useGetMultipleFiles', 'Error sending feedback:', error)
    }
  }

  const selectedLangItem = languageOptions.find((l) => l.value === language)

  useEffect(() => {
    fetch('/package.json')
      .then((r) => r.json())
      .then((pkg) => setCurrentVersion(pkg.version))
      .catch((error) =>
        logger.error(
          'useGetMultipleFiles',
          'Error fetching package.json:',
          error
        )
      )
  }, [])

  return html`
    <${SettingsLanguageSection}
      selectedItem=${selectedLangItem}
      onItemSelect=${handleLanguageChange}
      placeholder=${i18n._('Select')}
      title=${i18n._('Language')}
      languageOptions=${languageOptions}
    />

    <${SettingsReportSection}
      subTitle=${html`<${SubTitle}>${i18n._(
        'Tell us what’s going wrong and leave your email so we can follow up with you.'
      )}</${SubTitle}>`}
      onSubmitReport=${handleReportProblem}
      message=${message}
      title=${i18n._('Report a problem')}
      buttonText=${i18n._('send')}
      textAreaPlaceholder=${i18n._('Write your issue...')}
      textAreaOnChange=${setMessage}
      email=${email}
      emailPlaceholder=${i18n._('Write your email...')}
      onEmailChange=${handleEmailChange}
      emailError=${emailError}
    />

    <${SettingsDevicesSection} />

    <${SettingsPasswordsSection} />

    <${CardSingleSetting} title=${i18n._('Version')}>
      <${VersionWrapper}> ${currentVersion} <//>
    <//>
  `
}
