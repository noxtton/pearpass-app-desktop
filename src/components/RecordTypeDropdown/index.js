import { html } from 'htm/react'

import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'
import { MenuDropdown } from '../MenuDropdown'

/**
 * @param {{
 *  selectedRecord?: {
 *    name: string;
 *    icon?: React.ReactNode;
 *  },
 *  onRecordSelect: (record: {
 *    name: string;
 *    icon?: React.ReactNode;
 *  }) => void
 * }} props
 */
export const RecordTypeDropdown = ({ selectedRecord, onRecordSelect }) => {
  const { defaultItems } = useRecordMenuItems()

  const selectedItem = defaultItems.find((item) => item.type === selectedRecord)

  return html`
    <${MenuDropdown}
      selectedItem=${selectedItem}
      onItemSelect=${onRecordSelect}
      items=${defaultItems}
    />
  `
}
