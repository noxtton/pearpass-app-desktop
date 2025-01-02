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

import {
  NestedFile,
  NestedFileContainer,
  NewPopupMenuOpenContainer
} from './styles'
import { CreateNewPopupMenu } from '../../../components/CreateNewPopupMenu'
import { useOutsideClick } from '../../../hooks/useOutsideClick'

/**
 * @typedef SidebarNestedFileProps
 * @property {() => void} [icon]
 * @property {string} [color]
 * @property {boolean} [isNew]
 * @property {string} [name]
 */

/**
 * @param {SidebarNestedFileProps} props
 */

export const SidebarNestedFile = ({
  icon,
  name,
  color = colors.white.mode1,
  isNew = false
}) => {
  const { i18n } = useLingui()
  const [isNewPopupMenuOpen, setIsNewPopupMenuOpen] = useState(false)

  const menuRef = useOutsideClick({
    onOutsideClick: () => {
      setIsNewPopupMenuOpen(false)
    }
  })

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

  const handleFileClick = () => {
    if (isNew) {
      setIsNewPopupMenuOpen(!isNewPopupMenuOpen)
    }
  }

  return html`
    <${NestedFileContainer} ref=${menuRef}>
      <${NestedFile} color=${color} onClick=${handleFileClick}>
        <${icon} size="14" />
        ${name}
      <//>

      ${isNew &&
      isNewPopupMenuOpen &&
      html` <${NewPopupMenuOpenContainer}>
        <${CreateNewPopupMenu} menuItems=${menuItems} />
      <//>`}
    <//>
  `
}
