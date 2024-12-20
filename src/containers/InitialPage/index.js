import { html } from 'htm/react'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import {
  GreenText,
  PageContainer,
  PageContentContainer,
  PearHand,
  Title
} from './styles'

export const InitialLoadPage = () => {
  return html`
  <${InitialPageWrapper} >
    <${PageContainer}>
        <${PageContentContainer}>
            <${Title}>Protect <${GreenText}>your digital</${GreenText}> life</${Title}>
            <${PearHand} src='src/assets/images/pearHand.png' alt='pearHand'  />
      </${PageContentContainer}>
    </${PageContainer}>
    </${InitialPageWrapper} >
 `
}
