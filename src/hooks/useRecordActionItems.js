import { useLingui } from '@lingui/react'

/**
 * @param {{
 * excludeType: Array<string>
 * }}
 *
 * @returns {{
 *  actions: Array<{
 *  name: string,
 *  type: string
 * }>}}
 */
export const useRecordActionItems = ({ excludeTypes = [] } = {}) => {
  const { i18n } = useLingui()

  const defaultActions = [
    { name: i18n._('Select element'), type: 'select' },
    { name: i18n._('Pin element'), type: 'pin' },
    { name: i18n._('Move to another folder'), type: 'move' },
    { name: i18n._('Delete element'), type: 'delete' }
  ]

  const filteredActions = excludeTypes.length
    ? defaultActions.filter((action) => !excludeTypes.includes(action.type))
    : defaultActions

  return { actions: filteredActions }
}
