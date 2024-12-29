import { html } from 'htm/react'
import {
  ContentWrapper,
  LayoutWrapper,
  SideBarWrapper,
  SideViewWrapper
} from './styles'
import { Sidebar } from '../Sidebar'
import { useWindowResize } from '../../hooks/useWindowResize'
import { isDesktopSmall } from '../../utils/breakpoints'

/**
 * @typedef LayoutWithSidebarProps
 * @property {import('react').ReactNode} mainView
 * @property {import('react').ReactNode} sideView
 */

/**
 * @param {LayoutWithSidebarProps} props
 */

export const LayoutWithSidebar = ({ mainView, sideView }) => {
  const { width } = useWindowResize()

  return html`
    <${LayoutWrapper}>
      <${SideBarWrapper}>
        <${Sidebar}
          sidebarSize=${isDesktopSmall(width) ? 'default' : 'tight'}
        />
      <//>

      <${ContentWrapper}> ${mainView} <//>

      ${sideView && html` <${SideViewWrapper}> ${sideView} <//>`}
    <//>
  `
}
