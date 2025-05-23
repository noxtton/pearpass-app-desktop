import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { LockIcon } from 'pearpass-lib-ui-react-components'
import { useCreateRecord } from 'pearpass-lib-vault'

import { parseBitwardenData } from './parsers/bitwarden'
import { parseLastPass } from './parsers/lastPass'
import { parsePearPass } from './parsers/pearPass'
import { parseProtonPass } from './parsers/protonPass'
import { ContentContainer, Description, ImportOptionsContainer } from './styles'
import { readFileContent } from './utils/readFileContent'
import { CardSingleSetting } from '../../../components/CardSingleSetting'
import { ImportDataOption } from '../../../components/ImportDataOption'

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
    title: 'Proton Pass',
    type: 'protonpass',
    accepts: ['.csv', '.json'],
    imgSrc: '/assets/images/ProtonPass.png'
  },
  {
    title: 'Encrypted file',
    type: 'encrypted',
    accepts: ['.json'],
    icon: LockIcon
  },
  {
    title: 'Unencrypted file',
    type: 'unencrypted',
    accepts: ['.json', '.csv'],
    icon: LockIcon
  }
]

export const ImportTab = () => {
  const { createRecord } = useCreateRecord()

  const handleFileChange = async (files, type) => {
    const file = files[0]
    if (!file) return

    const fileType = file.name.split('.').pop()
    let result = []

    const fileContent = await readFileContent(file)

    try {
      switch (type) {
        // case '1password':
        //   if (fileType !== 'csv') {
        //     console.error('Invalid file type. Please upload a CSV file.')
        //     return
        //   }
        //   try {
        //     result = await import1Password(file)
        //   } catch (error) {
        //     console.error('Error parsing 1Password file:', error)
        //     return
        //   }
        //   break
        case 'bitwarden':
          if (!['csv', 'json'].includes(fileType)) {
            throw new Error(
              'Invalid file type. Please upload a JSON or CSV file.'
            )
          }
          result = await parseBitwardenData(fileContent, fileType)
          break
        case 'lastpass':
          if (fileType !== 'csv') {
            throw new Error('Invalid file type. Please upload a CSV file.')
          }
          result = await parseLastPass(fileContent, fileType)
          break
        case 'protonpass':
          if (!['csv', 'json'].includes(fileType)) {
            throw new Error(
              'Invalid file type. Please upload a CSV or JSON file.'
            )
          }
          result = await parseProtonPass(fileContent, fileType)
          break
        case 'unencrypted':
          if (!['csv', 'json'].includes(fileType)) {
            throw new Error(
              'Invalid file type. Please upload a CSV or JSON file.'
            )
          }
          result = await parsePearPass(fileContent, fileType)
          break
        default:
          throw new Error(
            'Unsupported file type. Please select a valid import option.'
          )
      }

      await Promise.all(result.map((record) => createRecord(record)))
    } catch (error) {
      console.error('Error reading file:', error.message || error)
    }
  }

  const { i18n } = useLingui()

  return html` <${CardSingleSetting} title=${i18n._('Export')}>
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
              onFilesSelected=${(files) => handleFileChange(files, type)}
            />`
        )}
      <//>
    <//>
  <//>`
}
