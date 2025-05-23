import { downloadFile } from './downloadFile'
import { downloadZip } from './downloadZip'

export const handleExportJsonPerVaultTest = async (data) => {
  const vaultsToExport = data.map((vault) => {
    const records = vault.records.map((record) => ({
      ...record,
      vaultName: vault.name
    }))

    const json = JSON.stringify(records, null, 2)

    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_')
    const safeVaultName = vault.name.replace(/[^a-z0-9]/gi, '_')

    const filename = `PearPass_${safeVaultName}_${timestamp}.json`

    return {
      filename,
      data: json
    }
  })

  if (vaultsToExport.length === 1) {
    downloadFile(
      { filename: vaultsToExport[0].filename, content: vaultsToExport[0].data },
      'json'
    )
  } else if (vaultsToExport.length > 1) {
    await downloadZip(vaultsToExport)
  }
}
