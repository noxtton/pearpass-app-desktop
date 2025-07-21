import { html } from 'htm/react'

import { GradientContainer } from '../GradientContainer'
import { Container, DescriptionText, ImageContainer } from './styles'

export const WelcomeToPearpass = ({ isLockLocked }) => html`
  <${Container}>
    <${ImageContainer}>
      <${GradientContainer}>
        <img
          src=${isLockLocked
            ? 'assets/images/BigLockLocked.png'
            : 'assets/images/BigLock.png'}
        />
      <//>
    <//>

    <${DescriptionText}>
      This is a description text for the Welcome to Pearpass section.
    <//>
  <//>
`
