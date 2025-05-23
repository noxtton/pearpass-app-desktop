import { addHttps } from '../../../../utils/addHttps'
import { getRowsFromCsv } from '../utils/getRowsFromCsv'

export const parseProtonPassJson = (json) => {
  const result = []

  for (const vault of Object.values(json.vaults)) {
    for (const item of vault.items) {
      const entry = item.data
      const type = entry.type
      const metadata = entry.metadata || {}
      const content = entry.content || {}

      let data = {
        title: metadata.name || '',
        customFields: [],
        folder: vault.name || null
      }

      switch (type) {
        case 'login':
          data = {
            ...data,
            username: content.itemUsername || '',
            password: content.password || '',
            note: metadata.note || '',
            websites: (content.urls || []).map((url) => addHttps(url))
          }
          break

        case 'identity':
          data = {
            ...data,
            fullName: content.fullName || '',
            email: content.email || '',
            phoneNumber: content.phoneNumber || '',
            address: content.streetAddress || '',
            zip: content.zipOrPostalCode || '',
            city: content.city || '',
            region: content.stateOrProvince || '',
            country: content.countryOrRegion || '',
            note: metadata.note || ''
          }
          break

        case 'note':
          data = {
            ...data,
            note: metadata.note || ''
          }
          break

        default:
          data = {
            ...data
          }
      }

      result.push({
        type,
        data,
        folder: vault.name || null,
        isFavorite: item.pinned === true
      })
    }
  }

  return result
}

export const parseProtonPassCsv = (csvText) => {
  const result = []

  const [headers, ...rows] = getRowsFromCsv(csvText)

  for (const row of rows) {
    const rowData = Object.fromEntries(row.map((v, i) => [headers[i], v]))
    const { type, name, url, username, password, note, vault, email } = rowData

    let data
    switch (type) {
      case 'login':
        data = {
          title: name,
          username: username || email || '',
          password: password || '',
          note: note || '',
          websites: url ? [addHttps(url)] : [],
          customFields: []
        }
        break

      case 'identity':
        let identityData = {}
        try {
          identityData = JSON.parse(note)
        } catch {
          identityData = {}
        }

        data = {
          title: name,
          fullName: identityData.fullName || '',
          email: identityData.email || '',
          phoneNumber: identityData.phoneNumber || '',
          address: identityData.streetAddress || '',
          zip: identityData.zipOrPostalCode || '',
          city: identityData.city || '',
          region: identityData.stateOrProvince || '',
          country: identityData.countryOrRegion || '',
          note: '',
          customFields: []
        }
        break

      case 'note':
        data = {
          title: name,
          note: note || '',
          customFields: []
        }
        break

      default:
        data = {
          title: name,
          customFields: [
            {
              type: 'note',
              note: note || ''
            },
            {
              type: 'note',
              note: email || ''
            }
          ]
        }
    }

    result.push({
      type: type === 'alias' ? 'custom' : type,
      data,
      folder: vault || '',
      isFavorite: false
    })
  }

  return result
}

export const parseProtonPass = (data, fileType) => {
  if (fileType === 'json') {
    return parseProtonPassJson(JSON.parse(data))
  }

  if (fileType === 'csv') {
    return parseProtonPassCsv(data)
  }

  throw new Error('Unsupported file type')
}
