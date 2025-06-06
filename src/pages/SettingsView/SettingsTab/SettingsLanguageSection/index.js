import { html } from 'htm/react'

import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { Select } from '../../../../components/Select'

/**
 * @param {{
 *    selectedItem?: { name: string },
 *    languageOptions: Array<{ name: string, value: string }>,
 *    onItemSelect: (item: { name: string }) => void,
 *    placeholder: string
 *    title: string
 *  }} props
 */
export const SettingsLanguageSection = ({
  selectedItem,
  onItemSelect,
  placeholder,
  title,
  languageOptions = []
}) => html`
  <${CardSingleSetting} title=${title}>
    <${Select}
      items=${languageOptions}
      selectedItem=${selectedItem}
      onItemSelect=${onItemSelect}
      placeholder=${placeholder}
    />
  <//>
`
