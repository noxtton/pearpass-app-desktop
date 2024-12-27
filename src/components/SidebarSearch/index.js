import { html } from 'htm/react'
import { SearchInput, SearchLabelIcon, sidebarSearchContainer } from './styles'
import { SearchIcon } from '../../svgs/Icons/SearchIcon'
import { useLingui } from '@lingui/react'

export const SidebarSearch = () => {
  const { i18n } = useLingui()

  return html`
    <${sidebarSearchContainer}>
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
