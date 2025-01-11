import { html } from 'htm/react'

import { CategoriesContainer } from './styles'
import { SidebarCategory } from '../../../components/SidebarCategory'
import { RECORD_COLOR_BY_TYPE } from '../../../constants/recordColorByTYpe'
import { RECORD_ICON_BY_TYPE } from '../../../constants/recordIconByType'
import { useRouter } from '../../../context/RouterContext'
import { useRecordMenuItems } from '../../../hooks/useRecordMenuItems'

/**
 *
 * @param {{
 *  sidebarSize: 'default' | 'tight'
 * }} props
 */
export const SideBarCategories = ({ sidebarSize = 'default' }) => {
  const { navigate, data } = useRouter()

  const { menuItems } = useRecordMenuItems()

  const handleRecordClick = (type) => {
    navigate('vault', { ...data, recordType: type })
  }

  return html`
    <${CategoriesContainer} size=${sidebarSize}>
      ${menuItems.map(
        (record) => html`
          <${SidebarCategory}
            key=${record.type}
            categoryName=${record.name}
            color=${RECORD_COLOR_BY_TYPE[record.type]}
            quantity=${50}
            isSelected=${data.recordType === record.type}
            icon=${RECORD_ICON_BY_TYPE[record.type]}
            onClick=${() => handleRecordClick(record.type)}
            size=${sidebarSize}
          />
        `
      )}
    <//>
  `
}
