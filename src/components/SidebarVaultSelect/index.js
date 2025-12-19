import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useVault } from 'pearpass-lib-vault'

import {
  CreateVaultButton,
  Dropdown,
  DropdownItem,
  HeaderButton,
  HeaderLeft,
  HeaderLabel,
  HeaderRight,
  Wrapper
} from './styles'
import { CreateVaultModalContent } from '../../containers/Modal/CreateVaultModalContent'
import { VaultPasswordFormModalContent } from '../../containers/Modal/VaultPasswordFormModalContent'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import {
  LockCircleIcon,
  LockIcon,
  SmallArrowIcon
} from '../../lib-react-components'
import { logger } from '../../utils/logger'

/**
 * @param {{
 *  vaults: Array<{ id: string, name: string }>
 *  selectedVault: { id: string, name: string }
 * }} props
 */
export const SidebarVaultSelect = ({ vaults, selectedVault }) => {
  const { i18n } = useLingui()

  const { navigate } = useRouter()
  const { closeModal, setModal } = useModal()

  const [isOpen, setIsOpen] = useState(false)
  const [protectedVaultIds, setProtectedVaultIds] = useState(() => new Set())

  const { isVaultProtected, refetch: refetchVault } = useVault()

  useEffect(() => {
    let isCancelled = false

    ;(async () => {
      if (!vaults?.length) {
        setProtectedVaultIds(new Set())
        return
      }

      try {
        const results = await Promise.all(
          vaults.map(async (vault) => {
            const isProtected = await isVaultProtected(vault?.id)
            return [vault?.id, Boolean(isProtected)]
          })
        )

        if (isCancelled) {
          return
        }

        const next = new Set(
          results.filter(([, isProtected]) => isProtected).map(([id]) => id)
        )
        setProtectedVaultIds(next)
      } catch (error) {
        logger.error('SidebarVaultSelect', error)
      }
    })()

    return () => {
      isCancelled = true
    }
  }, [vaults, isVaultProtected])

  const handleVaultUnlock = async ({ vault, password }) => {
    if (!vault?.id) {
      return
    }

    try {
      await refetchVault(vault.id, { password })
      closeModal()
      navigate('vault', { recordType: 'all' })
    } catch (error) {
      logger.error('SidebarVaultSelect', error)
      throw error
    }
  }

  const handleSelectVault = async (vault) => {
    const isProtected = await isVaultProtected(vault?.id)

    if (isProtected) {
      setModal(
        html`<${VaultPasswordFormModalContent}
          onSubmit=${async (password) =>
            await handleVaultUnlock({ vault, password })}
          vault=${vault}
        />`
      )

      setIsOpen(false)
      return
    }

    await refetchVault(vault?.id)
    navigate('vault', { recordType: 'all' })
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
      <${HeaderButton}
        data-testid="sidebar-vault-select"
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
          (vault) => html`
            <${DropdownItem}
              data-testid=${`sidebar-vault-option-${vault.id}`}
              key=${vault.id}
              onClick=${() => handleSelectVault(vault)}
            >
              ${vault?.name}
              ${protectedVaultIds.has(vault?.id) &&
              html`<${LockIcon} size="18" color=${colors.grey200.mode1} />`}
            <//>
          `
        )}

        <${CreateVaultButton}
          data-testid="sidebar-vault-create"
          onClick=${handleCreateNewVault}
        >
          ${i18n._('Create New Vault')}
        <//>
      <//>
    <//>
  `
}
