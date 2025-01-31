import { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonLittle } from 'pearpass-lib-ui-react-components'

import { RadioSelect } from '../../../components/RadioSelect'
import { useModal } from '../../../context/ModalContext'
import { ModalHeader } from '../ModalHeader'
import { PassphraseChecker } from './PassphraseChecker'
import { PassphraseGenerator } from './PassphraseGenerator/index.'
import { PasswordChecker } from './PasswordChecker'
import { PasswordGenerator } from './PasswordGenerator'
import { HeaderButtonWrapper, RadioWrapper, Wrapper } from './styles'
import { generatePassphrase, generatePassword } from './utils'
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard'

/**
 * @param {{
 * onPaswordInsert: (pass: string) => void
 * }} props
 */
export const GeneratePasswordSideDrawerContent = ({ onPaswordInsert }) => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()
  const { copyToClipboard } = useCopyToClipboard()

  const [selectedOption, setSelectedOption] = useState('passphrase')
  const [selectedRules, setSelectedRules] = useState({
    password: {
      specialCharacters: true,
      characters: 5
    },
    passphrase: {
      capitalLetters: true,
      symbols: true,
      numbers: true,
      words: 6
    }
  })

  const pass = useMemo(() => {
    if (selectedOption === 'passphrase') {
      return generatePassphrase(
        selectedRules.passphrase.capitalLetters,
        selectedRules.passphrase.symbols,
        selectedRules.passphrase.numbers,
        selectedRules.passphrase.words
      )
    } else {
      return generatePassword(
        selectedRules.password.characters,
        selectedRules.password.specialCharacters
      )
    }
  }, [selectedOption, selectedRules])

  const radioOptions = [
    { label: i18n._('Passphrase'), value: 'passphrase' },
    { label: i18n._('Password'), value: 'password' }
  ]

  const handleRuleChange = (optionName, value) => {
    setSelectedRules((prevRules) => ({
      ...prevRules,
      [optionName]: value
    }))
  }

  const handleCopyAndClose = () => {
    const copyText = (selectedOption === 'passphrase') ? pass.join('-') : pass

    copyToClipboard(copyText)
    closeModal()
  }

  const handleInsertPassword = () => {
    onPaswordInsert(pass)
    closeModal()
  }

  return html`
    <${Wrapper}>
      <${ModalHeader} onClose=${closeModal}>
        <${HeaderButtonWrapper}>
          ${onPaswordInsert
            ? html`<${ButtonLittle} onClick=${handleInsertPassword}>
                ${i18n._('Insert password')}
              <//> `
            : html`<${ButtonLittle} onClick=${handleCopyAndClose}>
                ${i18n._('Copy and close')}
              <//> `}
        <//>
      <//>

      ${selectedOption === 'passphrase'
        ? html` <${PassphraseChecker} pass=${pass} />`
        : html` <${PasswordChecker} pass=${pass} />`}

      <${RadioWrapper}>
        <${RadioSelect}
          title=${i18n._('Type')}
          options=${radioOptions}
          selectedOption=${selectedOption}
          onChange=${setSelectedOption}
        />
      <//>

      ${selectedOption === 'passphrase'
        ? html` <${PassphraseGenerator}
            onRuleChange=${handleRuleChange}
            rules=${selectedRules.passphrase}
          />`
        : html`<${PasswordGenerator}
            onRuleChange=${handleRuleChange}
            rules=${selectedRules.password}
          />`}
    <//>
  `
}
