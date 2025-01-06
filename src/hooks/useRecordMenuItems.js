import { useLingui } from '@lingui/react'

/**
 * @returns {Array<{
 *  name: string,
 *  type: string
 * }>}
 */
export const useRecordMenuItems = () => {
  const { i18n } = useLingui()

  return [
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
    },
    {
      name: i18n._('Password'),
      type: 'password'
    }
  ]
}
