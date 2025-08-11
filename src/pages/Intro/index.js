import { useEffect, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { ButtonSecondary } from 'pearpass-lib-ui-react-components'

import { AddDevice } from './AddDevice'
import { CategoryAnimation } from './CategoryAnimation'
import { CreditCardAnimation } from './CreditCardAnimation'
import { PasswordFillAnimation } from './PasswordFillAnimation'
import {
  BlackBackground,
  ButtonContainer,
  ContentContainer,
  LastPageContentContainer,
  LastPageDescription,
  LogoContainer,
  StrongText,
  Video,
  WelcomeText
} from './styles'
import { TutorialContainer } from './TutorialContainer'
import { WelcomeToPearpass } from './WelcomeToPearpass'
import { useRouter } from '../../context/RouterContext'
import { LogoLock } from '../../svgs/LogoLock'

export const Intro = () => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const [pageIndex, setPageIndex] = useState(0)

  const [isLockLocked, setIsLockLocked] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLockLocked(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleNextPage = () => {
    if (pageIndex >= 5) {
      navigate('welcome', {
        state: 'createMasterPassword'
      })
      return
    }
    setPageIndex((prevIndex) => prevIndex + 1)
  }

  const renderPageContent = () => {
    switch (pageIndex) {
      case 0:
        return html` <${WelcomeToPearpass} isLockLocked=${isLockLocked} /> `
      case 1:
        return html`
          <${TutorialContainer}
            header=${i18n._('You hold the keys')}
            description=${[
              i18n._('No one can unlock your data,'),
              html`<${StrongText}>${i18n._('not even us.')}<//>`,
              i18n._('Your data stays '),
              html`<${StrongText}>${i18n._('fully encrypted and local')}<//>`,
              i18n._('to your device.'),
              html`<${StrongText}
                >${i18n._('Keep your master password safe,')}<//
              >`,
              i18n._('because if you lose it, its gone forever.')
            ]}
            content=${html`<${PasswordFillAnimation} />`}
          />
        `
      case 2:
        return html`
          <${TutorialContainer}
            header=${i18n._('Store more than passwords')}
            description=${[
              html`<${StrongText}
                >${i18n._('Your digital life. Organized and encrypted. ')}<//
              >`,
              i18n._(
                'Store everything from passwords to cards, IDs, and notes.'
              ),
              html`<${StrongText}
                >${i18n._('Grouped how you like. Accessible only to you.')}<//
              >`
            ]}
            content=${html`<${CategoryAnimation} />`}
          />
        `
      case 3:
        return html`
          <${TutorialContainer}
            header=${i18n._('All in one encrypted place.')}
            description=${[
              html`<${StrongText}>${i18n._('Store everything')}<//>`,
              i18n._('from passwords to payment cards, IDs, and private notes')
            ]}
            content=${html`<${CreditCardAnimation} />`}
          />
        `

      case 4:
        return html`
          <${TutorialContainer}
            header=${i18n._('Sync, without the Cloud')}
            description=${[
              html`<${StrongText}>${i18n._('No servers. No middlemen.')}<//>`,
              i18n._('Pearpass syncs directly across your devices using'),
              html`<${StrongText}>${i18n._('peer-to-peer technology,')}<//>`,
              i18n._('powered by Pear Runtime.')
            ]}
            content=${html`<${AddDevice} />`}
          />
        `

      case 5:
        return html`
          <${LastPageContentContainer}>
            <${Video} src="assets/video/lock_close_3s.mp4" autoPlay />
            <${LastPageDescription}
              >${i18n._(
                'Start protecting your passwords the peer-to-peer way.'
              )}
            <//>
          <//>
        `

      default:
        return null
    }
  }

  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === 5

  return html`
    <${BlackBackground} pageIndex=${pageIndex} hasImageBackground=${isLastPage}>
      <${LogoContainer} size=${isFirstPage || isLastPage ? 'md' : 'sm'}>
        <${WelcomeText}>Welcome to<//>
        <${LogoLock} width="100%" height="100" />
      <//>

      <${ContentContainer}> ${renderPageContent()} <//>

      <${ButtonContainer} className=${isLockLocked ? 'fade-in' : ''}>
        <${ButtonSecondary} disabled=${!isLockLocked} onClick=${handleNextPage}>
          ${isFirstPage ? i18n._('Get started') : i18n._('Continue')}
        <//>
      <//>
    <//>
  `
}
