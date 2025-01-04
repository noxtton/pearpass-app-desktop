import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  CommonFileIcon,
  CreditCardIcon,
  FullBodyIcon,
  KeyIcon,
  LockIcon,
  UserIcon,
  ButtonCreate
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  CollectionsContainer,
  CollectionsTitle,
  SearchContainer,
  Wrapper
} from './styles'
import { ButtonPlusCreateNew } from '../../components/ButtonPlusCreateNew'
import { CreateNewPopupMenu } from '../../components/CreateNewPopupMenu'
import { InputSearch } from '../../components/InputSearch'
import { useRouter } from '../../context/RouterContext'

export const EmptyCollectionView = () => {
  const { i18n } = useLingui()
  const { data } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const createCollectionOptions = [
    { icon: UserIcon, text: i18n._('Create a login'), id: 'login' },
    { icon: FullBodyIcon, text: i18n._('Create an identity'), id: 'identity' },
    {
      icon: CreditCardIcon,
      text: i18n._('Create a credit card'),
      id: 'creditCard'
    },
    { icon: CommonFileIcon, text: i18n._('Create a note'), id: 'note' },
    { icon: LockIcon, text: i18n._('Create a custom element'), id: 'custom' }
  ]

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
    <${Wrapper}>
      <${SearchContainer}>
        <${InputSearch} />
        <${CreateNewPopupMenu}
          isOpen=${isOpen}
          setIsOpen=${setIsOpen}
          menuItems=${menuItems}
        >
          <${ButtonPlusCreateNew} isOpen=${isOpen} />
        <//>
      <//>
      <${CollectionsContainer}>
        <${CollectionsTitle}>
          <span> ${i18n._('This collection is empty.')}</span>
          <p>${i18n._('Create a new element or pass to another collection')}</p>
        <//>
        ${createCollectionOptions
          .filter(
            (option) =>
              data.categoryId === 'all' || option.id === data.categoryId
          )
          .map(
            (option) => html`
              <${ButtonCreate} startIcon=${option.icon}> ${option.text} <//>
            `
          )}
      <//>
    <//>
  `
}
