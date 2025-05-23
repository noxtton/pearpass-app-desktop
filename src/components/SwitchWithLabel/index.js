import { html } from 'htm/react'
import { Switch } from 'pearpass-lib-ui-react-components'

import { Label, Wrapper } from './styles'

/**
 * @param {{
 *  isOn?: boolean,
 *  onChange?: (isOn: boolean) => void
 *  label?: string,
 *  isLabelBold?: boolean
 *  isSwitchFirst?: boolean
 *  stretch?: boolean
 * }} props
 */
export const SwitchWithLabel = ({
  isOn,
  onChange,
  label,
  isLabelBold,
  isSwitchFirst = false,
  stretch = true
}) => {
  const toggleSwitch = () => {
    onChange?.(!isOn)
  }

  return html`
    <${Wrapper}
      isSwitchFirst=${isSwitchFirst}
      stretch=${stretch}
      onClick=${toggleSwitch}
    >
      <${Label} isBold=${isLabelBold}> ${label} <//>

      <${Switch} isOn=${isOn} />
    <//>
  `
}
