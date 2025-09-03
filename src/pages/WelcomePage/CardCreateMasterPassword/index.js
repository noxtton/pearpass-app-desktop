import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { useForm } from 'pear-apps-lib-ui-react-hooks'
import { Validator } from 'pear-apps-utils-validator'
import {
  ButtonPrimary,
  ButtonRadio,
  ButtonRoundIcon,
  PearPassPasswordField,
  XIcon
} from 'pearpass-lib-ui-react-components'
import { useUserData } from 'pearpass-lib-vault'
import { isPasswordSafe } from 'pearpass-utils-password-check'

import {
  ButtonWrapper,
  CardContainer,
  CardTitle,
  CloseButtonContainer,
  Description,
  InputGroup,
  InputLabel,
  RadioGroup,
  RadioText,
  RadioTextBold,
  TermsOfUseContainer,
  Title
} from './styles'
import { AlertBox } from '../../../components/AlertBox'
import { LOCAL_STORAGE_KEYS } from '../../../constants/localStorage'
import { useGlobalLoading } from '../../../context/LoadingContext'
import { useRouter } from '../../../context/RouterContext'
import { logger } from '../../../utils/logger'

export const CardCreateMasterPassword = () => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()
  const [isAgreed, setIsAgreed] = useState(false)
  const [termsOfUseError, setTermsOfUseError] = useState(false)
  const [isTermsOfUseOpen, setIsTermsOfUseOpen] = useState(false)

  const errors = {
    minLength: i18n._(`Password must be at least 8 characters long`),
    hasLowerCase: i18n._('Password must contain at least one lowercase letter'),
    hasUpperCase: i18n._('Password must contain at least one uppercase letter'),
    hasNumbers: i18n._('Password must contain at least one number'),
    hasSymbols: i18n._('Password must contain at least one special character')
  }

  const [isLoading, setIsLoading] = useState(false)

  useGlobalLoading({ isLoading })

  const { createMasterPassword } = useUserData()

  const schema = Validator.object({
    password: Validator.string().required(i18n._('Password is required')),
    passwordConfirm: Validator.string().required(i18n._('Password is required'))
  })

  const { register, handleSubmit, setErrors, setValue } = useForm({
    initialValues: {
      password: '',
      passwordConfirm: ''
    },
    validate: (values) => schema.validate(values)
  })

  const onSubmit = async (values) => {
    if (isLoading) {
      return
    }

    if (!isAgreed) {
      setTermsOfUseError(true)
      return
    }

    const result = isPasswordSafe(values.password, { errors: errors })

    if (result.strength !== 'strong' && result.errors.length > 0) {
      setErrors({
        password: result.errors[0]
      })

      setValue('passwordConfirm', '')
      return
    }

    if (values.password !== values.passwordConfirm) {
      setErrors({
        passwordConfirm: i18n._('Passwords do not match')
      })

      return
    }

    try {
      setIsLoading(true)

      await createMasterPassword(values.password)

      navigate(currentPage, { state: 'masterPassword' })

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      setErrors({
        password: i18n._('Error creating master password')
      })

      logger.error(
        'useGetMultipleFiles',
        'Error creating master password:',
        error
      )
    }
  }

  const handleTOUToggle = () => {
    if (isAgreed) {
      localStorage.removeItem(LOCAL_STORAGE_KEYS.TOU_ACCEPTED)
      setIsAgreed(false)
      setTermsOfUseError(false)
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOU_ACCEPTED, 'true')
      setIsAgreed(true)
      setTermsOfUseError(false)
    }
  }

  if (isTermsOfUseOpen) {
    return html`
      <${TermsOfUseContainer}>
        <${CloseButtonContainer} onClick=${() => setIsTermsOfUseOpen(false)}>
          <${ButtonRoundIcon} startIcon=${XIcon} />
        <//>
        <${CardTitle}> ${i18n._('PearPass Terms of Use')} <//>
        <iframe
          src="/assets/pearpass-tou-30-07-25.html"
          style=${{
            width: '100%',
            height: '50vh',
            border: 'none'
          }}
          title="Terms of Use"
        />
      <//>
    `
  }

  return html`
    <${CardContainer} onSubmit=${handleSubmit(onSubmit)}>
      <${CardTitle}>
        <${Title}> ${i18n._('Create Master Password')} <//>

        <${Description}>
          ${i18n._(
            'The first thing to do is create a Master password to secure your account. You’ll use this password to access PearPass. '
          )}
        <//>
      <//>

      <${InputGroup}>
        <${InputLabel}> ${i18n._('Master Password')} <//>
        <${PearPassPasswordField} ...${register('password')} />
      <//>

      <${InputGroup}>
        <${InputLabel}> ${i18n._('Confirm Master Password')} <//>
        <${PearPassPasswordField} ...${register('passwordConfirm')} />
      <//>

      <${AlertBox}
        message=${i18n._(
          'Don’t forget your master password. It’s the only way to access your vault. We can’t help recover it. Back it up securely.'
        )}
      />

      <${InputGroup}>
        <${InputLabel}> ${i18n._('PearPass Terms of Use')} <//>
        <${RadioGroup} onClick=${handleTOUToggle} isError=${termsOfUseError}>
          <${ButtonRadio} isActive=${isAgreed} />
          <${RadioText}>
            ${i18n._('I have read and agree to the')} ${' '}
            <${RadioTextBold}
              onClick=${(e) => {
                e.stopPropagation()
                setIsTermsOfUseOpen(true)
              }}
            >
              ${i18n._('PearPass Application Terms of Use.')}
            <//>
          <//>
        <//>
      <//>

      <${ButtonWrapper}>
        <${ButtonPrimary} type="submit"> ${i18n._('Continue')} <//>
      <//>
    <//>
  `
}
