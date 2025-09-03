import { useLingui } from '@lingui/react'
import { html } from 'htm/react'

import { Container, ImageContainer, LeftText, Video } from './styles'
import { Header } from '../TutorialContainer/styles'

export const WelcomeToPearpass = ({ isLockLocked }) => {
  const { i18n } = useLingui()

  return html`
    <${Container}>
      <${LeftText} className=${isLockLocked ? 'fade-in' : ''}>
        <${Header}>
          <div>${i18n._('Fully local,')}</div>
          <div>${i18n._('Open-source,')}</div>
          <div>${i18n._('Password manager.')}</div>
        <//>
      <//>
      <${ImageContainer}>
        <${Video}
          src="assets/video/lock_close_6s.mp4"
          autoPlay
          className=${isLockLocked ? 'animate' : ''}
        />
      <//>
    <//>
  `
}

//  <${Header}>${i18n._('Your passwords. Your rules.')}<//>
//         <${LeftDescriptionText}>
//           ${[
//             i18n._('PearPass is the first truly local,'),
//             html`<${StrongText}
//               >${i18n._('peer-to-peer password manager.')}<//
//             >`,
//             i18n._(' Your data'),
//             html`<${StrongText}>${i18n._('never touches a server -')}<//>`,
//             i18n._('it lives with you, syncs between your devices, and'),
//             html`<${StrongText}
//               >${i18n._('stays entirely in your control.')}<//
//             >`
//           ].map((part, index) => html`<span key=${index}> ${part} </span>`)}
//         <//>
//       <//>
