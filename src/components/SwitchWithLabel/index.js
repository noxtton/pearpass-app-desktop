import { html } from 'htm/react'
import { Switch } from 'pearpass-lib-ui-react-components'

import { Label, Wrapper } from './styles'

/**
 * @param {{
 *  isOn?: boolean,
 *  onChange?: (isOn: boolean) => void
 *  label?: string,
 *  isLabelBold?: boolean
 * }} props
 */
export const SwitchWithLabel = ({ isOn, onChange, label, isLabelBold }) => {
  const toggleSwitch = () => {
    onChange?.(!isOn)
  }

  return html`
    <${Wrapper} onClick=${toggleSwitch}>
      <${Label} isBold=${isLabelBold}> ${label} <//>

      <${Switch} isOn=${isOn} />
    <//>
  `
}
