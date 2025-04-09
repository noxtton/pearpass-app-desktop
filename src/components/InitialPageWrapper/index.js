import { html } from 'htm/react'

import {
  Background,
  LeftSpotlightWrapper,
  LogoContainer,
  MiddleSmallSpotlightWrapper,
  PageContent,
  RightSpotlightWrapper
} from './styles'
import { LogoLock } from '../../svgs/LogoLock'
import { SpotLightLeft } from '../../svgs/SpotlightLeft'
import { SpotlightMiddle } from '../../svgs/SpotlightMiddle'
import { SpotlightRight } from '../../svgs/SpotlightRight'

/**
 * @param {{
 *  children: import('react').ReactNode
 * }} props
 */
export const InitialPageWrapper = ({ children }) => html`
  <${Background}>
    <${LeftSpotlightWrapper}>
      <${SpotLightLeft} />
    <//>

    <${MiddleSmallSpotlightWrapper}>
      <${SpotlightMiddle} width="500" />
    <//>

    <${RightSpotlightWrapper}>
      <${SpotlightRight} />
    <//>

    <${PageContent}>
      <${LogoContainer}>
        <${LogoLock} />
      <//>

      ${children}
    <//>
  <//>
`
