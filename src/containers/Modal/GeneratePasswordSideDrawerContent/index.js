import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ButtonLittle,
  NoticeText,
  Slider
} from 'pearpass-lib-ui-react-components'

import {
  HeaderButtonWrapper,
  PasswordWrapper,
  RadioWrapper,
  SliderContainer,
  SliderLabel,
  SliderWrapper,
  SwitchWrapper,
  Wrapper
} from './styles'
import { HighlightString } from '../../../components/HighlightString'
import { RadioSelect } from '../../../components/RadioSelect'
import { SwitchWithLabel } from '../../../components/SwitchWithLabel'
import { useModal } from '../../../context/ModalContext'
import { ModalHeader } from '../ModalHeader'

export const GeneratePasswordSideDrawerContent = () => {
  const { i18n } = useLingui()
  const { closeModal } = useModal()

  const [selectedOption, setSelectedOption] = useState('passphrase')
  const [sliderValue, setSliderValue] = useState(5)

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

      <${SliderWrapper}>
        <${SliderLabel}> 5 words <//>

        <${SliderContainer}>
          <${Slider}
            value=${sliderValue}
            onChange=${setSliderValue}
            min=${1}
            max=${32}
            step=${1}
          />
        <//>
      <//>

      <${SwitchWrapper}>
        <${SwitchWithLabel} label=${i18n._('Select all')} />
        <${SwitchWithLabel}
          label=${i18n._('Capital letters')}
          isOn=${true}
          isLabelBold
        />
        <${SwitchWithLabel} label=${i18n._('Symbols')} isLabelBold />
        <${SwitchWithLabel}
          label=${i18n._('Numbers')}
          isOn=${true}
          isLabelBold
        />
      <//>
    <//>
  `
}
