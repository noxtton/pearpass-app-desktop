import { addHttps } from '../../../../utils/addHttps'

export const parsePearPassJson = (records) =>
  records.map((record) => ({
    type: record.type,
    data: record.data,
    folder: record.folder || null,
    isFavorite: record.isFavorite === 'true'
  }))

export const parsePearPassCsv = async (text) => {
  const lines = text.split('\n').filter(Boolean)
  const headers = lines[0].split(',').map((h) => h.replace(/^"|"$/g, ''))

  const entries = lines.slice(1).map((line) => {
    const values = line
      .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
      .map((val) => val.replace(/^"|"$/g, '').replace(/""/g, '"'))
    const row = {}
    headers.forEach((h, i) => {
      row[h] = values[i]
    })
    return row
  })

  const result = entries.map((entry) => {
    const type = entry.type
    const data = {
      title: entry.title || ''
    }

    if (type === 'login') {
      data.username = entry.username || ''
      data.password = entry.password || ''
      data.websites = entry.websites
        ? entry.websites.split(';').map((w) => addHttps(w))
        : []
    } else if (type === 'creditCard') {
      data.name = entry.name || ''
      data.number = entry.number || ''
      data.expireDate = entry.expireDate || ''
      data.securityCode = entry.securityCode || ''
      data.pinCode = entry.pinCode || ''
    } else if (type === 'identity') {
      data.fullName = entry.fullName || ''
      data.email = entry.email || ''
      data.phoneNumber = entry.phoneNumber || ''
      data.address = entry.address || ''
      data.zip = entry.zip || ''
      data.city = entry.city || ''
      data.region = entry.region || ''
      data.country = entry.country || ''
    }

    data.note = entry.note || ''

    data.customFields = entry.customFields
      ? entry.customFields
          .split(';')
          .map((fieldStr) => {
            const [type = 'note', note] = fieldStr.split(':')
            return { type, note }
          })
          .filter((f) => f.note)
      : []

    return {
      type: type,
      data,
      folder: entry.folder || null,
      isFavorite: entry.isFavorite === 'true'
    }
  })

  return result
}

export const parsePearPass = (data, fileType) => {
  if (fileType === 'json') {
    return parsePearPassJson(JSON.parse(data))
  }

  if (fileType === 'csv') {
    return parsePearPassCsv(data)
  }

  throw new Error('Unsupported file type')
}
