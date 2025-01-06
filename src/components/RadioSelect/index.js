import { html } from 'htm/react'
import { ButtonRadio } from 'pearpass-lib-ui-react-components'

import { RadioOption, RadioSelectWrapper, Title } from './styles'

/**
 * @param {{
 *  title: string,
 *  options: { label: string, value: string }[],
 *  selectedOption: string,
 *  onChange: (value: string) => void
 * }} param0
 */
export const RadioSelect = ({ title, options, selectedOption, onChange }) => {
  const handleChange = (value) => {
    onChange(value)
  }

  return html`
    <${RadioSelectWrapper}>
      <${Title}>${title}<//>
      ${options.map(
        (option) => html`
          <${RadioOption}
            key=${option.value}
            onClick=${() => handleChange(option.value)}
          >
            <${ButtonRadio} isActive=${selectedOption === option.value} />
            ${option.label}
          <//>
        `
      )}
    <//>
  `
}
