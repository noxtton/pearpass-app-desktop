// @ts-check
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
