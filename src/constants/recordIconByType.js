import {
  UserIcon,
  FullBodyIcon,
  CreditCardIcon,
  CommonFileIcon,
  LockIcon,
  KeyIcon
} from 'pearpass-lib-ui-react-components'

/**
 * @type {Record<string, import('react').ElementType>}
 */
export const RECORD_ICON_BY_TYPE = {
  login: UserIcon,
  identity: FullBodyIcon,
  creditCard: CreditCardIcon,
  note: CommonFileIcon,
  custom: LockIcon,
  password: KeyIcon
}
