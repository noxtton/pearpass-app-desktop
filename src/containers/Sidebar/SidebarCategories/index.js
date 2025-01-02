import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  UserIcon,
  FullBodyIcon,
  CreditCardIcon,
  CommonFileIcon,
  LockIcon,
  KeyIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { CategoriesContainer } from './styles'
import { SidebarCategory } from '../../../components/SidebarCategory/index'

/**
 * @typedef SideBarCategoriesProps
 * @param {'default' | 'tight'} sidebarSize
 */

/**
 *
 * @param {SideBarCategoriesProps} props
 * @returns
 */

export const SideBarCategories = ({ sidebarSize = 'default' }) => {
  const { i18n } = useLingui()

  const pearPassCategoryDummyData = [
    {
      categoryName: i18n._('All'),
      icon: KeyIcon,
      quantity: 50,
      color: colors.primary400.option2
    },
    {
      categoryName: i18n._('Login'),
      icon: UserIcon,
      quantity: 50,
      color: colors.categoryLogin.option2
    },
    {
      categoryName: i18n._('Identity'),
      icon: FullBodyIcon,
      quantity: 50,
      color: colors.categoryIdentity.option2
    },
    {
      categoryName: i18n._('Credit card'),
      icon: CreditCardIcon,
      quantity: 50,
      color: colors.categoryCreditCard.option2
    },
    {
      categoryName: i18n._('Note'),
      icon: CommonFileIcon,
      quantity: 50,
      color: colors.categoryNote.option2
    },
    {
      categoryName: i18n._('Custom'),
      icon: LockIcon,
      quantity: 50,
      color: colors.categoryCustom.option2
    }
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)

  return html`
    <${CategoriesContainer}>
      ${pearPassCategoryDummyData.map(
        (category, index) => html`
          <${SidebarCategory}
            key=${category.categoryName}
            categoryName=${category.categoryName}
            color=${category.color}
            quantity=${category.quantity}
            selected=${selectedIndex === index}
            icon=${category.icon}
            onClick=${() => setSelectedIndex(index)}
            size=${sidebarSize}
          />
        `
      )}
    <//>
  `
}
