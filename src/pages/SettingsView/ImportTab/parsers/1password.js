export const parse1PasswordCSV = (csvText) => {
  const lines = csvText.trim().split(/\r?\n/)
  const headers = lines[0].split(',').map((h) => h.trim())
  const rows = lines
    .slice(1)
    .map((line) => line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/))

  const get = (row, name) =>
    row[headers.indexOf(name)]?.replace(/^"|"$/g, '').trim()

  const addHttps = (url) => {
    if (!url) return ''
    if (/^https?:\/\//i.test(url)) return url
    return `https://${url}`
  }

  const result = []

  for (const row of rows) {
    const title = get(row, 'Title') || ''
    const url = get(row, 'Url')
    const username = get(row, 'Username')
    const password = get(row, 'Password')
    const note = get(row, 'Notes')
    const isFavorite = get(row, 'Favorite') === 'true'

    result.push({
      type: 'login',
      folder: null,
      isFavorite,
      data: {
        title,
        username,
        password,
        note,
        websites: url ? [addHttps(url)] : [],
        customFields: []
      }
    })
  }

  return result
}

export const parse1PasswordData = (data, fileType) => {
  if (fileType === 'csv') {
    return parse1PasswordCSV(data)
  }

  throw new Error('Unsupported file type')
}
