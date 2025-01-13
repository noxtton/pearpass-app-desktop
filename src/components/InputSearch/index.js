import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { LockCircleIcon } from 'pearpass-lib-ui-react-components'

import { Container, IconWrapper, Input, QuantityWrapper } from './styles'

/**
 * @param {{
 *  value: string
 *  onChange: (event: import('react').ChangeEvent<HTMLInputElement>) => void
 * }} props
 */
export const InputSearch = ({ value, onChange }) => {
  const { i18n } = useLingui()
  return html`
    <${Container}>
      <${IconWrapper}>
        <${LockCircleIcon} />
      <//>
      <${Input}
        placeholder=${i18n._('Search...')}
        value=${value}
        onChange=${onChange}
      />
      <${QuantityWrapper}>70<//>
    <//>
  `
}
