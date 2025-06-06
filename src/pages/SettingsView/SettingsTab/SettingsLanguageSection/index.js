import { html } from 'htm/react'
import { LANGUAGES } from 'pearpass-lib-constants'

import { CardSingleSetting } from '../../../../components/CardSingleSetting'
import { Select } from '../../../../components/Select'

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
