export const getRowsFromCsv = (text) => {
  const lines = []
  let currentLine = []
  let currentField = ''
  let insideQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"'
        i++
      } else if (char === '"') {
        insideQuotes = false
      } else {
        currentField += char
      }
    } else {
      if (char === '"') {
        insideQuotes = true
      } else if (char === ',') {
        currentLine.push(currentField)
        currentField = ''
      } else if (char === '\n') {
        currentLine.push(currentField)
        lines.push(currentLine)
        currentLine = []
        currentField = ''
      } else if (char === '\r') {
        continue
      } else {
        currentField += char
      }
    }
  }

  if (currentField || currentLine.length > 0) {
    currentLine.push(currentField)
    lines.push(currentLine)
  }

  return lines
}
