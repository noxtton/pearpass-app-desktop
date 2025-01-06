import { html } from 'htm/react'

import { DashSpan, HighlightedText, NumberSpan, SymbolSpan } from './styles'

export const HighlightString = ({ text }) => {
  const highlightText = (text) => {
    const regex = /(\d+|[^a-zA-Z\d\s])/g
    const parts = text.split(regex)

    return parts.map((part, index) => {
      if (/^\d+$/.test(part)) {
        return html`<${NumberSpan} key=${index}>${part}<//>`
      } else if (part === '-') {
        return html`<${DashSpan} key=${index}>${part}<//>`
      } else if (/[^a-zA-Z\d\s]/.test(part)) {
        return html`<${SymbolSpan} key=${index}>${part}<//>`
      }
      return part
    })
  }

  return html`<${HighlightedText}>${highlightText(text)}<//>`
}
