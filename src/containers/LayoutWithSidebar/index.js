import { html } from 'htm/react'
import { ContentWrapper, LayoutWrapper, SideBarWrapper } from './styles'
import { Sidebar } from '../Sidebar'
import { useResize } from '../../hooks/useResize'
import { isDesktopSmall } from '../../utils/breakpoints'

/**
 * @typedef LayoutWithSidebarProps
 * @property {import('react').ReactNode} children
 */

/**
 * @param {LayoutWithSidebarProps} props
 */

export const LayoutWithSidebar = ({ children }) => {
  const { windowWidth } = useResize()

  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        <${Sidebar}
          sidebarSize=${isDesktopSmall(windowWidth) ? 'default' : 'tight'}
        />
      <//>
      <${ContentWrapper}> ${children} <//>
    <//>
  `
}
