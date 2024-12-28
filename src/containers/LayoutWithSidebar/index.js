import { html } from 'htm/react'
import { ContentWrapper, LayoutWrapper, SideBarWrapper } from './styles'
import { Sidebar } from '../Sidebar'
import { useWindowResize } from '../../hooks/useWindowResize'
import { isDesktopSmall } from '../../utils/breakpoints'

/**
 * @typedef LayoutWithSidebarProps
 * @property {import('react').ReactNode} children
 */

/**
 * @param {LayoutWithSidebarProps} props
 */

export const LayoutWithSidebar = ({ children }) => {
  const { width } = useWindowResize()

  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        <${Sidebar}
          sidebarSize=${isDesktopSmall(width) ? 'default' : 'tight'}
        />
      <//>
      <${ContentWrapper}> ${children} <//>
    <//>
  `
}
