import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary } from 'pearpass-lib-ui-react-components'
import {
  authoriseCurrentProtectedVault,
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
import { ListItem } from '../../../components/ListItem'
import { RadioSelect } from '../../../components/RadioSelect'
import { SwitchWithLabel } from '../../../components/SwitchWithLabel'
import { VaultPasswordFormModalContent } from '../../../containers/Modal/VaultPasswordFormModalContent'
import { useModal } from '../../../context/ModalContext'
import { vaultCreatedFormat } from '../../../utils/vaultCreated'

export const ExportTab = () => {
  const { closeModal, setModal } = useModal()
  const { i18n } = useLingui()
  const { data } = useVaults()
  const {
    isVaultProtected,
    refetch: refetchVault,
    data: currentVault
  } = useVault()

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
    if (
      selectedProtectedVault?.id &&
      currentVaultId === selectedProtectedVault.id
    ) {
      await authoriseCurrentProtectedVault(password)
    }

    const vault = await getVaultById(selectedProtectedVault.id, {
      password: password
    })

    const records = (await listRecords()) ?? []

    handleSubmitExport([{ ...vault, records }])

    await refetchVault(currentVaultId, currentEncryption)
  }

  const fetchUnprotectedVault = async (vaultId) => {
    const vault = await getVaultById(vaultId)
    const records = (await listRecords()) ?? []

    return { ...vault, records }
  }

  const handleVaultClick = async (vault) => {
    const isProtected = await isVaultProtected(vault.id)

    if (isProtected) {
      setSelectedProtectedVault(
        selectedProtectedVault?.id === vault.id ? null : vault
      )
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
        html`<${VaultPasswordFormModalContent}
          vault=${selectedProtectedVault}
          onSubmit=${async (password) => {
            await fetchProtectedVault(
              password,
              currentVaultId,
              currentEncryption
            )
            closeModal()
          }}
        />`
      )
    } else if (selectedVaults.length > 0) {
      const vaultsToExport = await Promise.all(
        selectedVaults.map(
          async (vaultId) => await fetchUnprotectedVault(vaultId)
        )
      )

      refetchVault(currentVaultId, currentEncryption)
      handleSubmitExport(vaultsToExport)
    }
  }

  useEffect(() => {
    refetchVault()
  }, [])

  return html` <${CardSingleSetting} title=${i18n._('Export')}>
    <${ContentContainer}>
      <${Description}>
        ${i18n._(
          'Choose which Vaults do you want to backup and select if you want the file encrypted'
        )}
      <//>
      ${data?.map(
        (vault) =>
          html`<${ListItem}
            key=${vault.name}
            itemName=${vault.name}
            itemDateText=${vaultCreatedFormat(vault.createdAt)}
            onClick=${() => handleVaultClick(vault)}
            isSelected=${selectedVaults.includes(vault.id) ||
            vault.id === selectedProtectedVault?.id}
          />`
      )}

      <!-- not supported yet -->
      <!-- <${SwitchWithLabel}
        isSwitchFirst
        stretch=${false}
        label=${'Encrypted file'}
        isOn=${shouldExportEncrypted}
        onChange=${() => setShouldExportEncrypted((prev) => !prev)}
        isLabelBold
      /> -->

      <${RadioSelect}
        title=${i18n._('Type')}
        options=${radioOptions}
        selectedOption=${exportType}
        onChange=${(type) => {
          setExportType(type)
        }}
      />

      <${ActionsContainer}>
        <${ButtonSecondary}
          onClick=${handleExport}
          disabled=${!selectedVaults.length && !selectedProtectedVault}
        >
          ${i18n._('Export')}
        <//>
      <//>
    <//>
  <//>`
}
