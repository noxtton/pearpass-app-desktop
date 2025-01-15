import { useLingui } from '@lingui/react'

/**
 * @returns {{
 * categoriesItems: Array<{
 *  name: string,
 *  type: string
 *  }>,
 * popupItems: Array<{
 *  name: string,
 *  type: string
 * }>}}
 */
export const useRecordMenuItems = () => {
  const { i18n } = useLingui()

  const defaultItems = [
    {
      name: i18n._('Login'),
      type: 'login'
    },
    {
      name: i18n._('Identity'),
      type: 'identity'
    },
    {
      name: i18n._('Credit Card'),
      type: 'creditCard'
    },
    {
      name: i18n._('Note'),
      type: 'note'
    },
    {
      name: i18n._('Custom'),
      type: 'custom'
    }
  ]

  const menuItems = [
    {
      name: i18n._('All'),
      type: 'all'
    },
    ...defaultItems
  ]

  const popupItems = [
    ...defaultItems,
    {
      name: i18n._('Password'),
      type: 'password'
    }
  ]

  return { menuItems, popupItems }
}
