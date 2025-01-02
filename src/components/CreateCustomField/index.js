import { html } from 'htm/react'
import { ArrowIconWrapper, DropDown, Label, Wrapper } from './styles'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CommonFileIcon,
  EmailIcon,
  ImageIcon,
  NineDotsIcon,
  PhoneIcon,
  PlusIcon,
  WorldIcon,
  ButtonFilter
} from 'pearpass-lib-ui-react-components'
import { useLingui } from '@lingui/react'
import { useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'

const OPTIONS = [
  {
    name: 'Email',
    type: 'email',
    icon: EmailIcon
  },
  {
    name: 'Picture',
    type: 'picture',
    icon: ImageIcon
  },
  {
    name: 'Note',
    type: 'note',
    icon: CommonFileIcon
  },
  {
    name: 'Pin code',
    type: 'pinCode',
    icon: NineDotsIcon
  },
  {
    name: 'Date',
    type: 'date',
    icon: CalendarIcon
  },
  {
    name: 'Website',
    type: 'website',
    icon: WorldIcon
  },
  {
    name: 'Phone number',
    type: 'phoneNumber',
    icon: PhoneIcon
  }
]

/**
 * @param {{
 *  onCreateCustom: (folder: string) => void
 * }} props
 */
export const CreateCustomField = ({ onCreateCustom }) => {
  const { i18n } = useLingui()

  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useOutsideClick({
    onOutsideClick: () => {
      setIsOpen(false)
    }
  })

  const handleSelect = (type) => {
    onCreateCustom(type)

    setIsOpen(false)
  }

  return html`
    <${Wrapper} ref=${wrapperRef}>
      <${Label} onClick=${() => setIsOpen(!isOpen)}>
        <${PlusIcon} size="21" />

        <div>${i18n._('Create Custom')}</div>

        <${ArrowIconWrapper}>
          <${isOpen ? ArrowUpIcon : ArrowDownIcon} size="21" />
        <//>
      <//>

      ${isOpen &&
      html`<${DropDown}>
        ${OPTIONS.map(
          (option) => html`
            <${ButtonFilter}
              variant="secondary"
              leftIcon=${option.icon}
              onClick=${() => handleSelect(option.type)}
            >
              ${option.name}
            <//>
          `
        )}
      <//>`}
    <//>
  `
}
