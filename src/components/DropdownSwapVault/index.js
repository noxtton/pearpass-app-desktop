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
import { VaultPasswordFormModalContent } from '../../containers/Modal/VaultPasswordFormModalContent'
import { useModal } from '../../context/ModalContext'
import { logger } from '../../utils/logger'

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
  const { closeModal, setModal } = useModal()

  const { isVaultProtected, refetch } = useVault({
    shouldSkip: true
  })

  const handleVaultUnlock = async ({ vault, password }) => {
    if (!vault.id) {
      return
    }

    try {
      await refetch(vault.id, { password })
      closeModal()
    } catch (error) {
      logger.error(error)

      throw error
    }
  }

  const onVaultSelect = async (vault) => {
    const isProtected = await isVaultProtected(vault?.id)
    if (isProtected) {
      setModal(
        html`<${VaultPasswordFormModalContent}
          onSubmit=${async (password) =>
            await handleVaultUnlock({ vault, password })}
          vault=${vault}
        />`
      )
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
        <${LockCircleIcon} size="24" color=${colors.primary400.mode1} />

        ${selectedVault?.name}

        <${ArrowIconWrapper}>
          <${isOpen ? ArrowUpIcon : ArrowDownIcon}
            size="24"
            color=${colors.primary400.mode1}
          />
        <//>
      <//>

      <${Dropdown} isOpen=${isOpen}>
        ${vaults?.map(
          (vault) => html`
            <${DropdownItem} onClick=${() => onVaultSelect(vault)}>
              <${LockCircleIcon} size="24" color=${colors.primary400.mode1} />
              ${vault.name}
            <//>
          `
        )}
      <//>
    <//>
  `
}
