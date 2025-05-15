import React from 'react'

import { render } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { SettingsLanguageSection } from './index'

import '@testing-library/jest-dom'

describe('SettingsLanguageSection', () => {
  const renderWithProviders = (component) =>
    render(<ThemeProvider>{component}</ThemeProvider>)

  it('matches snapshot', () => {
    const { container } = renderWithProviders(<SettingsLanguageSection />)

    expect(container).toMatchSnapshot()
  })
})
