import { logger } from './logger'
import { readFileContent } from '../pages/SettingsView/ImportTab/utils/readFileContent'

/**
 * @param {Object} params
 * @param {FileList} params.files
 * @param {string} params.fieldName
 * @param {Function} params.setValue
 * @param {Object} params.values
 *
 * @returns {void}
 */
export const handleFileSelect = ({ files, fieldName, setValue, values }) => {
  const file = files[0]
  const filename = file.name
  readFileContent(file, { as: 'buffer' })
    .then(async (arrayBuffer) => {
      const uint8Buffer = new Uint8Array(arrayBuffer)

      setValue(fieldName, [
        ...values[fieldName],
        { buffer: uint8Buffer, name: filename }
      ])
    })
    .catch((e) => {
      logger.error('Error reading file:', e)
    })
}
