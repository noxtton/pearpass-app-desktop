import React from 'react'

import { render } from '@testing-library/react'

import { SettingsSettingsVaultsTab } from './index'
import '@testing-library/jest-dom'

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: {
      _: (key) => key
    }
  })
}))

jest.mock('pearpass-lib-vault', () => ({
  useVaults: () => ({
    data: [
      { id: 'vault-1', name: 'Vault 1', createdAt: 1630000000000 },
      { id: 'vault-2', name: 'Vault 2', createdAt: 1630000000001 }
    ]
  })
}))

jest.mock('../../../components/CardSingleSetting', () => ({
  CardSingleSetting: ({ title, children }) => (
    <div data-testid="card-single-setting" title={title}>
      {children}
    </div>
  )
}))

jest.mock('../../../components/Vault', () => ({
  Vault: ({ vault }) => (
    <div data-testid={`vault-${vault.id}`} data-vault={JSON.stringify(vault)} />
  )
}))

jest.mock('./styles', () => ({
  content: ({ children }) => (
    <div data-testid="content-container">{children}</div>
  )
}))

describe('SettingsVaultsTab Component', () => {
  test('renders SettingsVaultsTab component correctly and matches snapshot', () => {
    const { asFragment } = render(<SettingsVaultsTab />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders the correct title for CardSingleSetting', () => {
    const { getByTestId } = render(<SettingsVaultsTab />)
    const cardElement = getByTestId('card-single-setting')
    expect(cardElement).toHaveAttribute('title', 'Manage Vaults')
  })

  test('renders a Vault component for each vault in the data', () => {
    const { getByTestId } = render(<SettingsVaultsTab />)

    const vault1Element = getByTestId('vault-vault-1')
    const vault2Element = getByTestId('vault-vault-2')

    expect(vault1Element).toBeInTheDocument()
    expect(vault2Element).toBeInTheDocument()

    const vault1Data = JSON.parse(vault1Element.dataset.vault)
    const vault2Data = JSON.parse(vault2Element.dataset.vault)

    expect(vault1Data.name).toBe('Vault 1')
    expect(vault2Data.name).toBe('Vault 2')
  })

  test('renders content container', () => {
    const { getByTestId } = render(<SettingsVaultsTab />)
    const contentContainer = getByTestId('content-container')
    expect(contentContainer).toBeInTheDocument()
  })

  test('handles case when data is undefined', () => {
    jest
      .spyOn(require('pearpass-lib-vault'), 'useVaults')
      .mockImplementation(() => ({
        data: undefined
      }))

    const { queryByTestId } = render(<SettingsVaultsTab />)
    expect(queryByTestId('vault-vault-1')).not.toBeInTheDocument()
    expect(queryByTestId('vault-vault-2')).not.toBeInTheDocument()
  })
})
