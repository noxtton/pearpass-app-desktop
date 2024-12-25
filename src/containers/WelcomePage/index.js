import { html } from 'htm/react'

import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import {
  ActionCardTitle,
  Actions,
  ActionsCard,
  LoadValutCard,
  LoadValutInput,
  LoadValutTitle,
  PageContainer,
  PearHand,
  Title
} from './styles'
import { useLingui } from '@lingui/react'
import { useModal } from '../../context/ModalContext'
import { ModalOverlay } from '../../components/ModalOverlay'
import { useRouter } from '../../context/RouterContext'
import {
  ButtonPrimary,
  ButtonSecondary
} from 'pearpass-lib-ui-react-components'

export const InitialWelcomePage = () => {
  const { i18n } = useLingui()

  const { openModal, isOpen } = useModal()
  const { navigate } = useRouter()

  const handleNewValutCreation = () => {
    navigate('loading')
  }

  return html`
    <${InitialPageWrapper} >
      <${PageContainer}>
        <${Title}>${i18n._('Hi Peer! Welcome to PearPass!')}</${Title}>
        ${
          !isOpen &&
          html`
          <${ActionsCard}>
            <${ActionCardTitle}  >
            ${i18n._('Start with')}
            <br />
            ${i18n._('creating a new vault or importing one')}
            </${ActionCardTitle} >
            <${Actions}>
              <${ButtonPrimary} size='md' onClick=${handleNewValutCreation} >
                  ${i18n._('Create a new vault')}
              </${ButtonPrimary}>
              <${ButtonSecondary} size="md" onClick=${openModal} type='button'>
                  ${i18n._('Load a vault')}
              </${ButtonSecondary}>
            </${Actions}>
          </${ActionsCard}>
        `
        }
        <${PearHand} src='src/assets/images/pearHandBig.png' alt='pearHand'  />
      </${PageContainer}>
      <${ModalOverlay}  blur=${'10px'} >
        <${LoadValutCard}>
          <${LoadValutTitle}> ${i18n._('Load an existing Vault')} </${LoadValutTitle}>
          <${LoadValutInput} placeholder=${i18n._('Insert your code vault...')} />
        </${LoadValutCard}>
      </${ModalOverlay}>
    </${InitialPageWrapper} >
  `
}
