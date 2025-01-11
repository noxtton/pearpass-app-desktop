import {
  CheckIcon,
  PinIcon,
  MoveToIcon,
  DeleteIcon
} from 'pearpass-lib-ui-react-components'

/**
 * @type {Record<string, import('react').ElementType>}
 */
export const RECORD_ACTION_ICON_BY_TYPE = {
  fix: PinIcon,
  select: CheckIcon,
  pin: PinIcon,
  move: MoveToIcon,
  delete: DeleteIcon
}
