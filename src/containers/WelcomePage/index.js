//@ts-check
import { html } from 'htm/react'
import { InitialPageWrapper } from '../../components/InitialPageWrapper'
import { ButtonPrimary } from '../../components/ButtonPrimary'
import { ButtonSecondary } from '../../components/ButtonSecondary'
import {
  ActionCardTitle,
  Actions,
  ActionsCard,
  PageContainer,
  Title
} from './styles'

export const InitialWelcomePage = () => {
  return html`
    <${InitialPageWrapper} >
        <${PageContainer}>
            <${Title}>Hi Peer! Welcome to PearPass!</${Title}>
            <${ActionsCard}>
                <${ActionCardTitle}>
                    Start with <br/> creating a new vault or importing one
                </${ActionCardTitle}>
                <${Actions}>
                    <${ButtonPrimary} size='md' >
                        Create a new vault
                    </${ButtonPrimary}>
                    <${ButtonSecondary} size='md' >
                        Load a vault
                    </${ButtonSecondary}>
                    </${Actions}>
            </${ActionsCard}>
        </${PageContainer}>
    </${InitialPageWrapper} >
  `
}
