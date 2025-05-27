import { downloadFile } from './downloadFile'
import { downloadZip } from './downloadZip'
import { parseDataToCsvText } from '../../../../../.yalc/tmp-pearpass-lib-data-export'

export const handleExportCSVPerVault = async (data) => {
  const vaultsToExport = await parseDataToCsvText(data)

  if (vaultsToExport.length === 1) {
    downloadFile(
      {
        filename: vaultsToExport[0].filename,
        content: vaultsToExport[0].data
      },
      'csv'
    )
  } else if (vaultsToExport.length > 1) {
    await downloadZip(vaultsToExport)
  }
}
