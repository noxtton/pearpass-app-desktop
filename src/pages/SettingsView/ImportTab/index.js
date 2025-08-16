import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  parse1PasswordData,
  parseBitwardenData,
  parseLastPassData,
  parseNordPassData,
  parsePearPassData,
  parseProtonPassData
} from 'pearpass-lib-data-import'
import { LockIcon } from 'pearpass-lib-ui-react-components'
import { useCreateRecord } from 'pearpass-lib-vault'

import { ContentContainer, Description, ImportOptionsContainer } from './styles'
import { readFileContent } from './utils/readFileContent'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { ImportDataOption } from '../../../components/ImportDataOption'
import { logger } from '../../../utils/logger'

const importOptions = [
  {
    title: '1Password',
    type: '1password',
    accepts: ['.csv'],
    imgSrc: '/assets/images/1password.png'
  },
  {
    title: 'Bitwarden',
    type: 'bitwarden',
    accepts: ['.json', '.csv'],
    imgSrc: '/assets/images/BitWarden.png'
  },
  {
    title: 'LastPass',
    type: 'lastpass',
    accepts: ['.csv'],
    imgSrc: '/assets/images/LastPass.png'
  },
  {
    title: 'NordPass',
    type: 'nordpass',
    accepts: ['.csv'],
    imgSrc: '/assets/images/NordPass.png'
  },
  {
    title: 'Proton Pass',
    type: 'protonpass',
    accepts: ['.csv', '.json'],
    imgSrc: '/assets/images/ProtonPass.png'
  },
  // Not supported yet
  // {
  //   title: 'Encrypted file',
  //   type: 'encrypted',
  //   accepts: ['.json'],
  //   icon: LockIcon
  // },
  {
    title: 'Unencrypted file',
    type: 'unencrypted',
    accepts: ['.json', '.csv'],
    icon: LockIcon
  }
]

const isAllowedType = (fileType, accepts) =>
  accepts.some((accept) => {
    if (accept.startsWith('.')) {
      return fileType === accept.slice(1)
    }
    return fileType === accept
  })

export const ImportTab = () => {
  const { i18n } = useLingui()

  const { createRecord } = useCreateRecord()

  const handleFileChange = async ({ files, type, accepts }) => {
    const file = files[0]
    if (!file) return

    const fileType = file.name.split('.').pop()
    let result = []

    const fileContent = await readFileContent(file)

    if (!isAllowedType(fileType, accepts)) {
      throw new Error('Invalid file type')
    }

    try {
      switch (type) {
        case '1password':
          result = await parse1PasswordData(fileContent, fileType)
          break
        case 'bitwarden':
          result = await parseBitwardenData(fileContent, fileType)
          break
        case 'lastpass':
          result = await parseLastPassData(fileContent, fileType)
          break
        case 'nordpass':
          result = await parseNordPassData(fileContent, fileType)
          break
        case 'protonpass':
          result = await parseProtonPassData(fileContent, fileType)
          break
        case 'unencrypted':
          result = await parsePearPassData(fileContent, fileType)
          break
        default:
          throw new Error(
            'Unsupported template type. Please select a valid import option.'
          )
      }

      await Promise.all(result.map((record) => createRecord(record)))
    } catch (error) {
      logger.error('Error reading file:', error.message || error)
    }
  }

  return html` <${CardSingleSetting} title=${i18n._('Import')}>
    <${ContentContainer}>
      <${Description}>
        ${i18n._(
          'Here you can import different file, export your data and then upload it here'
        )}
      <//>

      <${ImportOptionsContainer}>
        ${importOptions.map(
          ({ title, accepts, type, imgSrc, icon }) =>
            html`<${ImportDataOption}
              key=${title}
              title=${title}
              accepts=${accepts}
              imgSrc=${imgSrc}
              icon=${icon}
              onFilesSelected=${(files) => {
                handleFileChange({ files, type, accepts })
              }}
            />`
        )}
      <//>
    <//>
  <//>`
}
