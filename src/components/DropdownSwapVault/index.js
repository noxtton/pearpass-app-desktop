import { useState } from 'react'

import { html } from 'htm/react'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  LockCircleIcon
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useVault } from 'pearpass-lib-vault'

import { Container, Dropdown, DropdownItem, Wrapper } from './styles'
import { useLoadingContext } from '../../context/LoadingContext'

export const DropdownSwapVault = ({ vaults, selectedVault }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { setIsLoading } = useLoadingContext()

  const { refetch, isVaultProtected } = useVault({
    shouldSkip: true
  })

  const onVaultSelect = async (vaultId) => {
    try {
      setIsLoading(true)

      const isProtected = await isVaultProtected(vaultId)

      if (isProtected) {
        return
      }

      await refetch(vaultId)

      setIsOpen(false)

      setIsLoading(false)
    } catch (error) {
      console.error(error)

      setIsLoading(false)
    }
  }

  if (!vaults.length) {
    return
  }

  return html`
    <${Wrapper} isOpen=${isOpen}>
      <${Container} isOpen=${isOpen} onClick=${() => setIsOpen(!isOpen)}>
        <${LockCircleIcon} size="14" color=${colors.primary400.mode1} />
        ${selectedVault?.id}
        <${isOpen ? ArrowUpIcon : ArrowDownIcon}
          size="14"
          color=${colors.primary400.mode1}
        />
      <//>
      <${Dropdown} isOpen=${isOpen}>
        ${vaults.map(
          (vault) => html`
            <${DropdownItem} onClick=${() => onVaultSelect(vault.id)}>
              <${LockCircleIcon} size="14" color=${colors.primary400.mode1} />
              ${vault.id}
            <//>
          `
        )}
      <//>
    <//>
  `
}
