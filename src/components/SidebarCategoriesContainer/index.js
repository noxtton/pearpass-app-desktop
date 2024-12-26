import { html } from 'htm/react'
import { SidebarCategory } from '../SidebarCategory/index'
import { CategoriesContainer } from './styles'
import { useState } from 'react'
import { UserIcon } from '../../svgs/Icons/UserIcon'
import { FullBodyIcon } from '../../svgs/Icons/FullBodyIcon'
import { CreditCardIcon } from '../../svgs/Icons/CreditCardIcon'
import { CommonFileIcon } from '../../svgs/Icons/CommonFileIcon'
import { LockIcon } from '../../svgs/Icons/LockIcon'
import { KeyIcon } from '../../svgs/Icons/keyIcon'

const pearpassCategoryDummyData = [
  { categoryName: 'All', icon: KeyIcon, quantity: 50, color: 'primary400' },
  {
    categoryName: 'Login',
    icon: UserIcon,
    quantity: 50,
    color: 'categoryLogin'
  },
  {
    categoryName: 'Identity',
    icon: FullBodyIcon,
    quantity: 50,
    color: 'categoryIdentity'
  },
  {
    categoryName: 'Credit card',
    icon: CreditCardIcon,
    quantity: 50,
    color: 'categoryCreditCard'
  },
  {
    categoryName: 'Note',
    icon: CommonFileIcon,
    quantity: 50,
    color: 'categoryNote'
  },
  {
    categoryName: 'Custom',
    icon: LockIcon,
    quantity: 50,
    color: 'categoryCustom'
  }
]

/**
 * @typedef sideBarCategoriesContainerProps
 * @param {'default' | 'tight'} sidebarSize
 */

/**
 *
 * @param {sideBarCategoriesContainerProps} props
 * @returns
 */

export const sideBarCategoriesContainer = ({ sidebarSize = 'default' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return html`
    <${CategoriesContainer}>
      ${pearpassCategoryDummyData.map(
        (category, index) => html`
          <${SidebarCategory}
            categoryName=${category.categoryName}
            color=${category.color}
            quantity=${category.quantity}
            selected=${selectedIndex === index}
            icon=${category.icon}
            onClick=${() => setSelectedIndex(index)}
            sidebarSize=${sidebarSize}
          />
        `
      )}
    <//>
  `
}
