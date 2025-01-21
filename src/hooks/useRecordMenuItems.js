import { useLingui } from '@lingui/react'

import { RECORD_TYPES } from '../vault/constants/recordTypes'

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
      type: RECORD_TYPES.LOGIN
    },
    {
      name: i18n._('Identity'),
      type: RECORD_TYPES.IDENTITY
    },
    {
      name: i18n._('Credit Card'),
      type: RECORD_TYPES.CREDIT_CARD
    },
    {
      name: i18n._('Note'),
      type: RECORD_TYPES.NOTE
    },
    {
      name: i18n._('Custom'),
      type: RECORD_TYPES.CUSTOM
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
