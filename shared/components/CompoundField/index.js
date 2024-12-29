import { useState } from 'react'
import { CompoundFieldComponent } from './styles'
import { html } from 'htm/react'
import { useOutsideClick } from '../../../src/hooks/useOutsideClick'

/**
 * @typedef CompoundFieldProps
 * @property {import('react').ReactNode} children
 * @property {boolean} [isDisabled]
 */

/**
 * @param {CompoundFieldProps} props
 */

export const CompoundField = ({ children, isDisabled }) => {
  const [isFocused, setIsFocused] = useState(false)

  const ref = useOutsideClick({
    onOutsideClick: () => setIsFocused(false)
  })

  const handleFocus = () => {
    if (!isDisabled) {
      setIsFocused(true)
    }
  }

  return html`
    <${CompoundFieldComponent}
      ref=${ref}
      isFocused=${isFocused}
      isDisabled=${isDisabled}
      onClick=${() => handleFocus()}
    >
      ${children}
    <//>
  `
}
