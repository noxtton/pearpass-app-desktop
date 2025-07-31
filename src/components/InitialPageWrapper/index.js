import { html } from 'htm/react'

import {
  Background,
  ContentWrapper,
  LeftSpotlightWrapper,
  LogoContainer,
  PageContent
} from './styles'
import { LogoLock } from '../../svgs/LogoLock'

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
 */
export const InitialPageWrapper = ({ children }) => html`
  <${Background}>
    <${LeftSpotlightWrapper} />

    <${PageContent}>
      <${LogoContainer}>
        <${LogoLock} />
      <//>

      <${ContentWrapper}> ${children} <//>
    <//>
  <//>
`
// <${LeftSpotlightWrapper}>
//     <${SpotLightLeft} />
//   <//>

//   <${MiddleSmallSpotlightWrapper}>
//     <${SpotlightMiddle} width="500" />
//   <//>

//   <${RightSpotlightWrapper}>
//     <${SpotlightRight} />
//   <//>
