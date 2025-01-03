import { html } from 'htm/react'
import { Container, IconWrapper, input, QuantityWrapper } from './styles'
import { LockCircleIcon } from 'pearpass-lib-ui-react-components'
import { useLingui } from '@lingui/react'

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
