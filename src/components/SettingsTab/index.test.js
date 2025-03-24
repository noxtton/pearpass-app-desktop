import React from 'react'

import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { SettingsTab } from './index'
import '@testing-library/jest-dom'

// Mock dependencies
jest.mock('pearpass-lib-ui-react-components', () => ({
  TextArea: ({ placeholder, variant }) => (
    <textarea
      data-testid="text-area"
      data-variant={variant}
      placeholder={placeholder}
    />
  ),
  ButtonSecondary: ({ children, onClick }) => (
    <button data-testid="button-secondary" onClick={onClick}>
      {children}
    </button>
  )
}))

jest.mock('../CardSingleSetting', () => ({
  CardSingleSetting: ({ title, children }) => (
    <div data-testid="card-single-setting" data-title={title}>
      {children}
    </div>
  )
}))

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: { _: (str) => str }
  })
}))

describe('SettingsTab Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly', () => {
    const { container } = render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    expect(screen.getByTestId('card-single-setting')).toBeInTheDocument()
    expect(screen.getByTestId('text-area')).toBeInTheDocument()
    expect(screen.getByTestId('button-secondary')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders CardSingleSetting with correct title', () => {
    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    expect(screen.getByTestId('card-single-setting')).toHaveAttribute(
      'data-title',
      'Report a problem'
    )
  })

  test('renders TextArea with correct props', () => {
    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const textArea = screen.getByTestId('text-area')
    expect(textArea).toHaveAttribute('data-variant', 'report')
    expect(textArea).toHaveAttribute('placeholder', 'Write your issue...')
  })

  test('renders ButtonSecondary with correct text', () => {
    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    expect(screen.getByTestId('button-secondary')).toHaveTextContent('send')
  })

  test('renders components in the correct order', () => {
    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const { childNodes } = screen.getByTestId('card-single-setting')
    expect(childNodes.length).toBeGreaterThan(0)
  })
})
