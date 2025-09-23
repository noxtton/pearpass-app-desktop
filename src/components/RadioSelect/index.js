import { html } from 'htm/react'

import { RadioOption, RadioSelectWrapper, Title } from './styles'
import { ButtonRadio } from '../../lib-react-components'

/**
 * @param {{
 *  title: string,
 *  options: { label: string, value: string }[],
 *  selectedOption: string,
 *  onChange: (value: string) => void
 * }} props
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
