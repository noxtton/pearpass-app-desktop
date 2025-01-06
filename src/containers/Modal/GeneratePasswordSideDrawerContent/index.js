import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonLittle, NoticeText } from 'pearpass-lib-ui-react-components'

import {
  HeaderButtonWrapper,
  PasswordWrapper,
  RadioWrapper,
  Wrapper
} from './styles'
import { HighlightString } from '../../../components/HighlightString'
import { RadioSelect } from '../../../components/RadioSelect'
import { useModal } from '../../../context/ModalContext'
import { ModalHeader } from '../ModalHeader'

export const GeneratePasswordSideDrawerContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const [selectedOption, setSelectedOption] = useState('passphrase')

  const radioOptions = [
    { label: i18n._('Passphrase'), value: 'passphrase' },
    { label: i18n._('Password'), value: 'password' }
  ]

  return html`
    <${Wrapper}>
      <${ModalHeader} onClose=${closeModal}>
        <${HeaderButtonWrapper}>
          <${ButtonLittle}> ${i18n._('Insert password')} <//>
        <//>
      <//>

      <${PasswordWrapper}>
        <${HighlightString}
          text="Stench6-Taco2-Manicotti7-Velocity9-Serotonin5 )0Ag;"
        />

        <${NoticeText} text=${i18n._('Safe')} type="success" />
      <//>

      <${RadioWrapper}>
        <${RadioSelect}
          title=${i18n._('Type')}
          options=${radioOptions}
          selectedOption=${selectedOption}
          onChange=${setSelectedOption}
        />
      <//>
    <//>
  `
}
