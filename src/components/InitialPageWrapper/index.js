import { html } from 'htm/react'
import { PearPassTextLogo } from '../../svgs/PearPassLogo'
import { SpotLightLeft } from '../../svgs/SpotlightLeft'
import { SpotlightMiddle } from '../../svgs/SpotlightMiddle'
import { SpotlightRight } from '../../svgs/SpotlightRight'
import {
  Background,
  LeftSpotlightWrapper,
  LogoContainer,
  MiddleSmallSpotlightWrapper,
  PageContent,
  RightSpotlightWrapper
} from './styles'

/**
 * @typedef InitialPageWrapperProps
 * @property {import('react').ReactNode} children React node to be rendered inside the button
 */

/**
 * ButtonPrimary component
 * @param {InitialPageWrapperProps} props
 */

export const InitialPageWrapper = ({ children }) => {
  return html`
    <${Background}>
        <${LeftSpotlightWrapper} >
            <${SpotLightLeft}  />
        </${LeftSpotlightWrapper} >
        
        <${MiddleSmallSpotlightWrapper} >
            <${SpotlightMiddle} width='500'  />
        </${MiddleSmallSpotlightWrapper} >

        <${RightSpotlightWrapper} >
            <${SpotlightRight} />
        </${RightSpotlightWrapper} >

        <${PageContent}>
            <${LogoContainer}>
                <${PearPassTextLogo} />
            </${LogoContainer}>
            ${children}
        </${PageContent}>
    </${Background}>
  `
}
