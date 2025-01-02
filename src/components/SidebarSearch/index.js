import { html } from 'htm/react'
import { SearchInput, SearchLabelIcon, SidebarSearchContainer } from './styles'
import { SearchIcon } from 'pearpass-lib-ui-react-components'
import { useLingui } from '@lingui/react'

export const SidebarSearch = () => {
  const { i18n } = useLingui()

  return html`
    <${SidebarSearchContainer}>
      <${SearchLabelIcon} htmlFor=${'search'}>
        <${SearchIcon} />
      <//>

      <${SearchInput}
        type=${'search'}
        placeholder=${i18n._('Search folder...')}
        id=${'search'}
      />
    <//>
  `
}
