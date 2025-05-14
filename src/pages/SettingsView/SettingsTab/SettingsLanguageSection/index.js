import { html } from 'htm/react'

import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { Select } from '../../../../components/Select'
import { LANGUAGES } from '../../../../constants/languages'

/**
 * @param {{
 *    selectedItem?: { name: string },
 *    onItemSelect: (item: { name: string }) => void,
 *    placeholder: string
 *    title: string
 *  }} props
 */
export const SettingsLanguageSection = ({
  selectedItem,
  onItemSelect,
  placeholder,
  title
}) => html`
  <${CardSingleSetting} title=${title}>
    <${Select}
      items=${LANGUAGES}
      selectedItem=${selectedItem}
      onItemSelect=${onItemSelect}
      placeholder=${placeholder}
    />
  <//>
`
