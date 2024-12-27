import { html } from 'htm/react'
import { UserIcon } from '../../svgs/Icons/UserIcon'
import { FullBodyIcon } from '../../svgs/Icons/FullBodyIcon'
import { CreditCardIcon } from '../../svgs/Icons/CreditCardIcon'
import { CommonFileIcon } from '../../svgs/Icons/CommonFileIcon'
import { LockIcon } from '../../svgs/Icons/LockIcon'
import { KeyIcon } from '../../svgs/Icons/keyIcon'
import { MenuItem, MenuWrapper } from './styles'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useLingui } from '@lingui/react'

export const CreateNewPopupMenu = () => {
  const { i18n } = useLingui()

  const menuItems = [
    {
      icon: UserIcon,
      name: i18n._('Login'),
      color: colors.categoryLogin.option2
    },
    {
      icon: FullBodyIcon,
      name: i18n._('Identity'),
      color: colors.categoryIdentity.option2
    },
    {
      icon: CreditCardIcon,
      name: i18n._('Credit Card'),
      color: colors.categoryCreditCard.option2
    },
    {
      icon: CommonFileIcon,
      name: i18n._('Note'),
      color: colors.categoryNote.option2
    },
    {
      icon: LockIcon,
      name: i18n._('Custom'),
      color: colors.categoryCustom.option2
    },
    {
      icon: KeyIcon,
      name: i18n._('Password'),
      color: colors.categoryPassword.option2
    }
  ]

  return html`
    <${MenuWrapper}>
      ${menuItems.map(
        (item) =>
          html`<${MenuItem} color=${item.color} key=${item.name}>
            <${item.icon} width=${'14px'} color=${item.color} />
            ${item.name}
          <//>`
      )}
    <//>
  `
}
