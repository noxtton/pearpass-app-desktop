import { html } from 'htm/react'
import { InitialWelcomePage } from '../WelcomePage/index.js'
import { AppWrapper } from './styles.js'

export const App = () => {
  return html`
    <${AppWrapper}>
         <${InitialWelcomePage} />
    </${AppWrapper}>
  `
}
