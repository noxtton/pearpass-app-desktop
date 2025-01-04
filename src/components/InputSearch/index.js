import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { LockCircleIcon } from 'pearpass-lib-ui-react-components'

import { Container, IconWrapper, input, QuantityWrapper } from './styles'

export const InputSearch = () => {
  const { i18n } = useLingui()
  return html`
    <${Container}>
      <${IconWrapper}>
        <${LockCircleIcon} />
      <//>
      <${input} placeholder=${i18n._('Search...')} />
      <${QuantityWrapper}>70<//>
    <//>
  `
}
