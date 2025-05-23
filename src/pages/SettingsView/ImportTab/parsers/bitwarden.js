import { addHttps } from '../../../../utils/addHttps'
import { getRowsFromCsv } from '../utils/getRowsFromCsv'

export const parseBitwardenJson = (json) => {
  const folders = Object.fromEntries(
    (json.folders || []).map((f) => [f.id, f.name])
  )

  return (json.items || []).map((item) => {
    const { type, name, notes, favorite, folderId, login, card, identity } =
      item

    const folder = folders[folderId] || null
    let entryType = 'custom'
    let data = {}

    switch (type) {
      case 1: // login
        entryType = 'login'
        data = {
          title: name,
          username: login?.username || '',
          password: login?.password || '',
          note: notes || '',
          websites: (login?.uris || []).map((u) => addHttps(u.uri)),
          customFields: []
        }
        break

      case 2: // note
        entryType = 'note'
        data = {
          title: name,
          note: notes || '',
          customFields: []
        }
        break

      case 3: // credit card
        entryType = 'creditCard'
        data = {
          title: name,
          name: card?.cardholderName || '',
          number: card?.number || '',
          expireDate: card
            ? `${card.expMonth || ''}/${card.expYear || ''}`
            : '',
          securityCode: card?.code || '',
          pinCode: '',
          note: notes || '',
          customFields: []
        }
        break

      case 4: // identity
        entryType = 'identity'
        data = {
          title: name,
          fullName:
            `${identity?.firstName || ''} ${identity?.middleName || ''} ${identity?.lastName || ''}`.trim(),
          email: identity?.email || '',
          phoneNumber: identity?.phone || '',
          address: [identity?.address1, identity?.address2, identity?.address3]
            .filter(Boolean)
            .join(', '),
          zip: identity?.postalCode || '',
          city: identity?.city || '',
          region: identity?.state || '',
          country: identity?.country || '',
          note: notes || '',
          customFields: []
        }
        break

      default:
        entryType = 'custom'
        data = {
          title: name,
          customFields: []
        }
    }
    return {
      type: entryType,
      data,
      folder,
      isFavorite: Boolean(favorite)
    }
  })
}

export const parseBitwardenCSV = (csvText) => {
  const rows = getRowsFromCsv(csvText)
  const [headerRow, ...dataRows] = rows

  const headers = headerRow.map((h) => h.trim())
  const entries = []

  for (const row of dataRows) {
    const item = Object.fromEntries(
      headers.map((key, i) => [key, row[i]?.trim() ?? ''])
    )

    const { folder, favorite, type, name, notes } = item
    let entryType = 'custom'
    let data = {}

    switch (type) {
      case 'login':
        entryType = 'login'
        data = {
          title: name,
          username: item.login_username || '',
          password: item.login_password || '',
          note: notes || '',
          websites: (item.login_uri || '')
            .split(',')
            .map((uri) => uri.trim())
            .filter(Boolean)
            .map((website) => addHttps(website)),
          customFields: []
        }
        break

      case 'note':
        entryType = 'note'
        data = {
          title: name,
          note: notes || '',
          customFields: []
        }
        break

      default:
        entryType = 'custom'
        data = {
          title: name,
          customFields: []
        }
        break
    }

    entries.push({
      type: entryType,
      data,
      folder: folder || '',
      isFavorite: favorite.toLowerCase() === 'true'
    })
  }

  return entries
}

export const parseBitwardenData = (data, fileType) => {
  if (fileType === 'json') {
    return parseBitwardenJson(JSON.parse(data))
  }

  if (fileType === 'csv') {
    return parseBitwardenCSV(data)
  }

  throw new Error('Unsupported file type')
}
