import { useState } from 'react'
import { CompoundFieldComponent } from './styles'
import { html } from 'htm/react'
import { useOutsideClick } from '../../../src/hooks/useOutsideClick'

export const CompoundField = ({ children }) => {
  const [isFocused, setIsFocused] = useState(false)

  const ref = useOutsideClick({
    onOutsideClick: () => setIsFocused(false)
  })

  return html`
    <${CompoundFieldComponent}
      ref=${ref}
      isFocused=${isFocused}
      onClick=${() => setIsFocused(true)}
    >
      ${children}
    <//>
  `
}
