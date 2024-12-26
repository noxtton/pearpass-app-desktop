import { html } from 'htm/react'
import { SearchInput, SearchLabelIcon, sidebarSearchContainer } from './styles'
import { SearchIcon } from '../../svgs/Icons/SearchIcon'

export const SidebarSearch = () => {
  return html`
    <${sidebarSearchContainer}>
      <${SearchLabelIcon} for=${'search'}>
        <${SearchIcon} />
      <//>

      <${SearchInput}
        type=${'search'}
        placeholder=${'Search folder...'}
        id=${'search'}
      />
    <//>
  `
}
