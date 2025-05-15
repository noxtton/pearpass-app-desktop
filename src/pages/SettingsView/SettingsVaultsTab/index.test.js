import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'
import { useVaults } from 'pearpass-lib-vault'

import { SettingsVaultsTab } from './index'
import { useModal } from '../../../context/ModalContext'
import '@testing-library/jest-dom'

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: {
      _: (str) => str
    }
  }),
  I18nProvider: ({ children }) => children
}))

jest.mock('pearpass-lib-vault', () => ({
  useVaults: jest.fn()
}))

jest.mock('../../../context/ModalContext', () => ({
  useModal: jest.fn()
}))

jest.mock('../../../components/CardSingleSetting', () => ({
  CardSingleSetting: ({ title, children }) => (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  )
}))

jest.mock('../../../components/Vault', () => ({
  Vault: ({ vault, onEditClick }) => (
    <div>
      <p>{vault.name}</p>
      <button onClick={onEditClick}>Edit</button>
    </div>
  )
}))

describe('VaultsTab', () => {
  const setModalMock = jest.fn()

  const renderWithProviders = (component) =>
    render(<ThemeProvider>{component}</ThemeProvider>)

  beforeEach(() => {
    useVaults.mockReturnValue({
      data: [
        { id: '1', name: 'Vault 1' },
        { id: '2', name: 'Vault 2' }
      ]
    })

    useModal.mockReturnValue({
      setModal: setModalMock
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders Master Vault section', () => {
    const { container } = renderWithProviders(<SettingsVaultsTab />)

    expect(screen.getAllByText('Master Vault')[0]).toBeInTheDocument()
    expect(
      screen.getByText('Here you can modify the your Master password')
    ).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders Manage Vaults section with vaults', () => {
    renderWithProviders(<SettingsVaultsTab />)

    expect(screen.getByText('Manage Vaults')).toBeInTheDocument()
    expect(screen.getByText('Vault 1')).toBeInTheDocument()
    expect(screen.getByText('Vault 2')).toBeInTheDocument()
  })

  it('opens ModifyMasterVaultModalContent when editing Master Vault', () => {
    renderWithProviders(<SettingsVaultsTab />)

    const masterVaultEditButton = screen.getAllByText('Edit')[0]
    fireEvent.click(masterVaultEditButton)

    expect(setModalMock).toHaveBeenCalledWith(expect.anything())
  })

  it('opens ModifyVaultModalContent when editing a specific vault', () => {
    renderWithProviders(<SettingsVaultsTab />)

    const editButtons = screen.getAllByText('Edit')
    fireEvent.click(editButtons[1])

    expect(setModalMock).toHaveBeenCalledWith(expect.anything())
  })
})
