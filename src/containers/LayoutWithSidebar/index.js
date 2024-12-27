import { html } from 'htm/react'
import { ContentWrapper, LayoutWrapper, SideBarWrapper } from './styles'
import { Sidebar } from '../Sidebar'
import { useResize } from '../../hooks/useResize'

export const LayoutWithSidebar = () => {
  const { isTablet } = useResize()
  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        <${Sidebar} sidebarSize=${isTablet ? 'tight' : 'default'} />
      <//>
      <${ContentWrapper}> <//>
    <//>
  `
}
