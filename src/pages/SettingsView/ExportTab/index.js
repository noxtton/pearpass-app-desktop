import { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary } from 'pearpass-lib-ui-react-components'
import {
  getVaultById,
  getVaultEncryption,
  listRecords,
  useVault,
  useVaults
} from 'pearpass-lib-vault'

import { ActionsContainer, ContentContainer, Description } from './styles'
import { handleExportCSVPerVault } from './utils/exportCsvPerVault'
import { handleExportJsonPerVaultTest } from './utils/exportJsonPerVault'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { RadioSelect } from '../../../components/RadioSelect'
import { SwitchWithLabel } from '../../../components/SwitchWithLabel'
import { Vault } from '../../../components/Vault'
import { SwapVaultModalContent } from '../../../containers/Modal/SwapVaultModalContent'
import { useModal } from '../../../context/ModalContext'

export const ExportTab = () => {
  const { setModal } = useModal()
  const { i18n } = useLingui()
  const { data } = useVaults()
  const { isVaultProtected, refetch, data: currentVault } = useVault()

  const [selectedVaults, setSelectedVaults] = useState([])
  const [selectedProtectedVault, setSelectedProtectedVault] = useState(null)
  const [exportType, setExportType] = useState('json')
  const [shouldExportEncrypted, setShouldExportEncrypted] = useState(false)

  const radioOptions = [
    { label: i18n._('csv'), value: 'csv' },
    { label: i18n._('json'), value: 'json' }
  ]

  const handleSubmitExport = (vaultsToExport) => {
    if (exportType === 'json') {
      handleExportJsonPerVaultTest(vaultsToExport)
    }
    if (exportType === 'csv') {
      handleExportCSVPerVault(vaultsToExport)
    }

    setSelectedVaults([])
    setSelectedProtectedVault(null)
    setShouldExportEncrypted(false)
  }

  const fetchProtectedVault = async (
    password,
    currentVaultId,
    currentEncryption
  ) => {
    const vault = await getVaultById(selectedProtectedVault.id, {
      password: password
    })
    const records = (await listRecords()) ?? []

    handleSubmitExport([{ ...vault, records }])

    refetch(currentVaultId, currentEncryption)
  }

  const fetchUnprotectedVault = async (vaultId) => {
    const vault = await getVaultById(vaultId)
    const records = (await listRecords()) ?? []

    return { ...vault, records }
  }

  const handleVaultClick = async (vault) => {
    const isProtected = await isVaultProtected(vault.id)

    if (isProtected) {
      if (selectedProtectedVault?.id === vault.id) {
        setSelectedProtectedVault(null)
      } else {
        setSelectedProtectedVault(vault)
      }
      setSelectedVaults([])
      return
    }

    setSelectedVaults((prev) =>
      prev.includes(vault.id)
        ? prev.filter((vaultId) => vaultId !== vault.id)
        : [...prev, vault.id]
    )
    setSelectedProtectedVault(null)
  }

  const handleExport = async () => {
    const currentVaultId = currentVault?.id
    const currentEncryption = await getVaultEncryption(currentVaultId)

    if (selectedProtectedVault) {
      setModal(
        html`<${SwapVaultModalContent}
          vault=${selectedProtectedVault}
          onSubmit=${(password) =>
            fetchProtectedVault(password, currentVaultId, currentEncryption)}
        />`
      )
    } else if (selectedVaults.length > 0) {
      const vaultsToExport = await Promise.all(
        selectedVaults.map(
          async (vaultId) => await fetchUnprotectedVault(vaultId)
        )
      )

      refetch(currentVaultId, currentEncryption)
      handleSubmitExport(vaultsToExport)
    }
  }

  return html` <${CardSingleSetting} title=${i18n._('Export')}>
    <${ContentContainer}>
      <${Description}>
        ${i18n._(
          'Choose which Vaults do you want to backup and select if you want the file encrypted'
        )}
      <//>
      ${data?.map(
        (vault) =>
          html`<${Vault}
            key=${vault.name}
            vault=${vault}
            onClick=${handleVaultClick}
            isSelected=${selectedVaults.includes(vault.id) ||
            vault.id === selectedProtectedVault?.id}
          />`
      )}
      <${SwitchWithLabel}
        isSwitchFirst
        stretch=${false}
        label=${'Encrypted file'}
        isOn=${shouldExportEncrypted}
        onChange=${() => setShouldExportEncrypted((prev) => !prev)}
        isLabelBold
      />

      <${RadioSelect}
        title=${i18n._('Type')}
        options=${radioOptions}
        selectedOption=${exportType}
        onChange=${(type) => {
          setExportType(type)
        }}
      />

      <${ActionsContainer}>
        <${ButtonSecondary} onClick=${handleExport}> ${i18n._('Export')} <//>
      <//>
    <//>
  <//>`
}
