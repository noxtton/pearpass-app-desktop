import { useState } from 'react'

import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LockCircleIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useVault } from 'pearpass-lib-vault'

import {
  ArrowIconWrapper,
  Container,
  Dropdown,
  DropdownItem,
  Wrapper
} from './styles'
import { SwapVaultModalContent } from '../../containers/Modal/SwapVaultModalContent'
import { useModal } from '../../context/ModalContext'

/**
 *
 * @param {{
 *  *    vaults: Array<{
 *  *      id: string
 *  *      name: string
 *  *      }>
 *  *    selectedVault: {
 *  *      id: string
 *  *      name: string
 *  *    }
 * }} props
 */
export const DropdownSwapVault = ({ vaults, selectedVault }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { setModal } = useModal()

  const { isVaultProtected, refetch } = useVault({
    shouldSkip: true
  })

  const onVaultSelect = async (vault) => {
    const isProtected = await isVaultProtected(vault?.id)
    if (isProtected) {
      setModal(html`<${SwapVaultModalContent} vault=${vault} />`)
    } else {
      await refetch(vault?.id)
    }

    setIsOpen(false)
  }

  if (!vaults?.length) {
    return
  }

  return html`
    <${Wrapper} isOpen=${isOpen}>
      <${Container} isOpen=${isOpen} onClick=${() => setIsOpen(!isOpen)}>
        <${LockCircleIcon} size="14" color=${colors.primary400.mode1} />
        ${selectedVault?.name}
        <${ArrowIconWrapper}>
          <${isOpen ? ArrowUpIcon : ArrowDownIcon}
            size="14"
            color=${colors.primary400.mode1}
          />
        <//>
      <//>
      <${Dropdown} isOpen=${isOpen}>
        ${vaults?.map(
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
