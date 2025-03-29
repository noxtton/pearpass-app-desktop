import { useState } from 'react'

import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LockCircleIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import { Container, Dropdown, DropdownItem, Wrapper } from './styles'
import { SwapVaultModalContent } from '../../containers/Modal/SwapVaultModalContent'
import { useModal } from '../../context/ModalContext'

export const DropdownSwapVault = ({ vaults, selectedVault }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setModal } = useModal()

  const onVaultSelect = async (vault) => {
    setModal(html`<${SwapVaultModalContent} vault=${vault} />`)
  }

  if (!vaults.length) {
    return
  }

  return html`
    <${Wrapper} isOpen=${isOpen}>
      <${Container} isOpen=${isOpen} onClick=${() => setIsOpen(!isOpen)}>
        <${LockCircleIcon} size="14" color=${colors.primary400.mode1} />
        ${selectedVault?.name}
        <${isOpen ? ArrowUpIcon : ArrowDownIcon}
          size="14"
          color=${colors.primary400.mode1}
        />
      <//>
      <${Dropdown} isOpen=${isOpen}>
        ${vaults.map(
          (vault) => html`
            <${DropdownItem} onClick=${() => onVaultSelect(vault)}>
              <${LockCircleIcon} size="14" color=${colors.primary400.mode1} />
              ${vault.name}
            <//>
          `
        )}
      <//>
    <//>
  `
}
