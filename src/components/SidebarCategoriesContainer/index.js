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
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useLingui } from '@lingui/react'

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
  const { i18n } = useLingui()

  const pearpassCategoryDummyData = [
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
      ${pearpassCategoryDummyData.map(
        (category, index) => html`
          <${SidebarCategory}
            key=${category.categoryName}
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
