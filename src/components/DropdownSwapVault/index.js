import { useEffect, useState } from 'react'

import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useVault } from 'pearpass-lib-vault'

import {
  Container,
  CreateVaultButton,
  Dropdown,
  DropdownItem,
  DropdownItemLabel,
  HeaderLabel,
  HeaderLeft,
  HeaderRight,
  Wrapper
} from './styles'
import { CreateVaultModalContent } from '../../containers/Modal/CreateVaultModalContent'
import { VaultPasswordFormModalContent } from '../../containers/Modal/VaultPasswordFormModalContent'
import { useModal } from '../../context/ModalContext'
import { useTranslation } from '../../hooks/useTranslation'
import {
  LockCircleIcon,
  LockIcon,
  SmallArrowIcon
} from '../../lib-react-components'
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
  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const { closeModal, setModal } = useModal()

  const { isVaultProtected, refetch: refetchVault } = useVault()

  const [protectedVaultById, setProtectedVaultById] = useState({})

  useEffect(() => {
    if (!isOpen || !vaults?.length) {
      return
    }

    let isCancelled = false

    const loadProtected = async () => {
      const results = await Promise.all(
        vaults.map(async (vault) => {
          try {
            const isProtected = await isVaultProtected(vault.id)
            return [vault.id, !!isProtected]
          } catch {
            return [vault.id, false]
          }
        })
      )

      if (isCancelled) {
        return
      }

      setProtectedVaultById(Object.fromEntries(results))
    }

    loadProtected()

    return () => {
      isCancelled = true
    }
  }, [isOpen, isVaultProtected, vaults])

  const handleVaultUnlock = async ({ vault, password }) => {
    if (!vault.id) {
      return
    }

    try {
      await refetchVault(vault.id, { password })
      closeModal()
    } catch (error) {
      logger.error('DropdownSwapVault', error)

      throw error
    }
  }

  const onVaultSelect = async (vault) => {
    const cached = vault?.id ? protectedVaultById[vault.id] : undefined
    const isProtected =
      typeof cached === 'boolean' ? cached : await isVaultProtected(vault?.id)

    if (vault?.id && typeof cached !== 'boolean') {
      setProtectedVaultById((prev) => ({ ...prev, [vault.id]: !!isProtected }))
    }

    if (isProtected) {
      setModal(
        html`<${VaultPasswordFormModalContent}
          onSubmit=${async (password) =>
            await handleVaultUnlock({ vault, password })}
          vault=${vault}
        />`
      )
    } else {
      await refetchVault(vault?.id)
    }

    setIsOpen(false)
  }

  const handleCreateNewVault = () => {
    setIsOpen(false)

    setModal(
      html`<${CreateVaultModalContent}
        onClose=${closeModal}
        onSuccess=${closeModal}
      />`
    )
  }

  if (!selectedVault?.id) {
    return
  }

  return html`
    <${Wrapper}>
      <${Container}
        data-testid="dropdownswapvault-container"
        $isOpen=${isOpen}
        onClick=${() => setIsOpen(!isOpen)}
      >
        <${HeaderLeft}>
          <${LockCircleIcon} size="24" color=${colors.primary400.mode1} />
          <${HeaderLabel}>${selectedVault?.name}<//>
        <//>

        <${HeaderRight} $isOpen=${isOpen}>
          <${SmallArrowIcon} size="20" color=${colors.primary400.mode1} />
        <//>
      <//>

      <${Dropdown} $isOpen=${isOpen}>
        ${vaults?.map(
          (vault, index) => html`
            <${DropdownItem}
              data-testid=${`dropdownswapvault-option-${vault.id}`}
              key=${vault.id}
              $isOpen=${isOpen}
              $delayMs=${index * 30}
              onClick=${() => onVaultSelect(vault)}
            >
              <${DropdownItemLabel}>${vault.name}<//>
              ${protectedVaultById[vault.id]
                ? html`<${LockIcon} size="25" color=${colors.white.mode1} />`
                : null}
            <//>
          `
        )}

        <${CreateVaultButton}
          data-testid="dropdownswapvault-create"
          $isOpen=${isOpen}
          $delayMs=${(vaults?.length || 0) * 30}
          onClick=${handleCreateNewVault}
        >
          ${t('Create New Vault')}
        <//>
      <//>
    <//>
  `
}
