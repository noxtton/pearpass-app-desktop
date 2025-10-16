import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { SettingsBlindPeersSection } from './index'
import '@testing-library/jest-dom'

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: {
      _: (str) => str
    }
  })
}))

jest.mock('../../../../context/ModalContext', () => ({
  useModal: () => ({
    setModal: jest.fn(),
    closeModal: jest.fn()
  })
}))

jest.mock('../../../../components/CardSingleSetting', () => ({
  CardSingleSetting: ({ children, title }) => (
    <div data-testid="card-single-setting">
      <div>{title}</div>
      {children}
    </div>
  )
}))

jest.mock('../../../../containers/Modal/BlindPeersModalContent', () => ({
  BlindPeersModalContent: () => <div>BlindPeersModalContent</div>
}))

jest.mock(
  '../../../../containers/Modal/GeneratePasswordSideDrawerContent/RuleSelector',
  () => ({
    RuleSelector: ({ setRules }) => (
      <div>
        <button
          data-testid="enable-blind-peers"
          onClick={() => setRules({ blindPeers: true })}
        >
          Enable Blind Peers
        </button>
        <button
          data-testid="disable-blind-peers"
          onClick={() => setRules({ blindPeers: false })}
        >
          Disable Blind Peers
        </button>
      </div>
    )
  })
)

describe('SettingsBlindPeersSection', () => {
  const renderWithProviders = (component) =>
    render(<ThemeProvider>{component}</ThemeProvider>)

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<SettingsBlindPeersSection />)
    expect(container).toMatchSnapshot()
  })

  it('renders CardSingleSetting with correct title', () => {
    const { getByText } = renderWithProviders(<SettingsBlindPeersSection />)
    expect(getByText('Blind peers')).toBeInTheDocument()
  })

  it('enables blind peers when button is clicked', () => {
    const { getByTestId } = renderWithProviders(<SettingsBlindPeersSection />)
    fireEvent.click(getByTestId('enable-blind-peers'))
  })

  it('disables blind peers when button is clicked', () => {
    const { getByTestId } = renderWithProviders(<SettingsBlindPeersSection />)
    fireEvent.click(getByTestId('disable-blind-peers'))
  })
})
