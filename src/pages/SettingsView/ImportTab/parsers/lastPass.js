import { addHttps } from '../../../../utils/addHttps'
import { getRowsFromCsv } from '../utils/getRowsFromCsv'

export const parseLastPassCsv = (text) => {
  const rows = getRowsFromCsv(text)
  const headers = rows[0]
  const entries = rows.slice(1)

  const get = (row, name) => row[headers.indexOf(name)]?.trim()

  const getField = (extra, label) => {
    const match = extra.match(new RegExp(`${label}:(.*)`))
    return match?.[1]?.trim() || ''
  }

  const normalizePhone = (value) => {
    try {
      const parsed = JSON.parse(value)
      return parsed.num && parsed.ext
        ? `+${parsed.num}${parsed.ext}`
        : `+${parsed.num}`
    } catch {
      return value
    }
  }

  const normalizeExpiry = (value) => {
    const parts = value.split(',')
    if (parts.length === 2) {
      const month = new Date(`${parts[0]} 1`).getMonth() + 1
      const year = parts[1].slice(-2)
      return `${month.toString().padStart(2, '0')}/${year}`
    }
    return value
  }

  const toCustomFields = (extraText, usedNotes = new Set()) => {
    if (!extraText?.trim()) return []
    return extraText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(
        (line) => line && !line.startsWith('NoteType:') && !usedNotes.has(line)
      )
      .map((note) => {
        let formatted = note
        if (/^(Phone|Fax|Evening Phone):/.test(note)) {
          const [label, value] = note.split(/:(.+)/)
          formatted = `${label}:${normalizePhone(value)}`
        }
        usedNotes.add(note)
        return { type: 'note', note: formatted }
      })
  }

  const toWebsites = (urlString) =>
    urlString ? urlString.split(',').map((site) => addHttps(site.trim())) : []

  const result = []

  for (const row of entries) {
    const url = get(row, 'url')
    const username = get(row, 'username')
    const password = get(row, 'password')
    const extra = get(row, 'extra')
    const name = get(row, 'name')
    const folder = get(row, 'grouping') || null
    const isFavorite = get(row, 'fav') === '1'

    const usedNotes = new Set()

    let customFields = toCustomFields(extra, usedNotes)
    const websites = toWebsites(url)

    if (/NoteType:Credit Card/i.test(extra)) {
      const note = getField(extra, 'Notes')
      if (note) usedNotes.add(note)
      customFields = toCustomFields(extra, usedNotes)

      result.push({
        type: 'creditCard',
        folder,
        isFavorite,
        data: {
          title: name || '',
          name: getField(extra, 'Name on Card'),
          number: getField(extra, 'Number'),
          expireDate: normalizeExpiry(getField(extra, 'Expiration Date')),
          securityCode: getField(extra, 'Security Code'),
          pinCode: '',
          note,
          customFields
        }
      })
    } else if (/NoteType:Address|NoteType:Identity/i.test(extra)) {
      const note = getField(extra, 'Notes')
      if (note) usedNotes.add(note)
      customFields = toCustomFields(extra, usedNotes)

      result.push({
        type: 'identity',
        folder,
        isFavorite,
        data: {
          title: name || '',
          fullName: [
            getField(extra, 'First Name'),
            getField(extra, 'Middle Name'),
            getField(extra, 'Last Name')
          ]
            .filter(Boolean)
            .join(' '),
          username: getField(extra, 'Username'),
          email: getField(extra, 'Email Address'),
          phoneNumber: normalizePhone(getField(extra, 'Mobile Phone')),
          address: [
            getField(extra, 'Address 1'),
            getField(extra, 'Address 2'),
            getField(extra, 'Address 3')
          ]
            .filter(Boolean)
            .join(', '),
          zip: getField(extra, 'Zip / Postal Code'),
          city: getField(extra, 'City / Town'),
          region: getField(extra, 'State'),
          country: getField(extra, 'Country'),
          note,
          customFields
        }
      })
    } else if (!password && extra) {
      if (extra) usedNotes.add(extra)
      customFields = toCustomFields(extra, usedNotes)

      result.push({
        type: 'note',
        folder,
        isFavorite,
        data: {
          title: name || '',
          note: extra,
          customFields
        }
      })
    } else {
      if (extra) usedNotes.add(extra)
      customFields = toCustomFields(extra, usedNotes)

      result.push({
        type: 'login',
        folder,
        isFavorite,
        data: {
          title: name || '',
          username,
          password,
          note: extra || '',
          websites,
          customFields
        }
      })
    }
  }

  return result
}

export const parseLastPass = (data, fileType) => {
  if (fileType === 'csv') {
    return parseLastPassCsv(data)
  }

  throw new Error('Unsupported file type')
}
