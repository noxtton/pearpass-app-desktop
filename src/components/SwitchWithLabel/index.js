import { html } from 'htm/react'
import { Switch } from 'pearpass-lib-ui-react-components'

import { ContentWrapper, Description, Label, Wrapper } from './styles'

/**
 * @param {{
 *  isOn?: boolean,
 *  onChange?: (isOn: boolean) => void
 *  label?: string,
 *  description?: string,
 *  isLabelBold?: boolean
 *  isSwitchFirst?: boolean
 *  stretch?: boolean
 * }} props
 */
export const SwitchWithLabel = ({
  isOn,
  onChange,
  label,
  description,
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
      <${ContentWrapper}>
        <${Label} isBold=${isLabelBold}> ${label} <//>
        ${description && html`<${Description}> ${description} <//>`}
      <//>
      <${Switch} isOn=${isOn} />
    <//>
  `
}
