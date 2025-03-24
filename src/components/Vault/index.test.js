import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { Vault } from './index'
import '@testing-library/jest-dom'

jest.mock('@lingui/react', () => ({
  useLingui: () => ({
    i18n: {
      _: (key) => key
    }
  })
}))

jest.mock('pear-apps-utils-date', () => ({
  formatDate: () => 'formatted-date'
}))

jest.mock('pearpass-lib-ui-react-components', () => ({
  BrushIcon: () => <svg data-testid="brush-icon" />,
  DeleteIcon: () => <svg data-testid="delete-icon" />,
  LockCircleIcon: () => <svg data-testid="lock-icon" />,
  ShareIcon: () => <svg data-testid="share-icon" />
}))

describe('Vault Component', () => {
  const dummyVault = {
    id: 'vault-123',
    createdAt: 1630000000000
  }

  test('renders Vault component correctly and matches snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Vault
          vault={dummyVault}
          onClick={() => {}}
          onShareClick={() => {}}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      </ThemeProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('calls onClick when Vault container is clicked', () => {
    const onClick = jest.fn()
    const { container } = render(
      <ThemeProvider>
        <Vault
          vault={dummyVault}
          onClick={onClick}
          onShareClick={() => {}}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      </ThemeProvider>
    )

    fireEvent.click(container.firstChild)
    expect(onClick).toHaveBeenCalled()
  })

  test('calls onShareClick when share icon is clicked', () => {
    const onShareClick = jest.fn()
    const { container } = render(
      <ThemeProvider>
        <Vault
          vault={dummyVault}
          onClick={() => {}}
          onShareClick={onShareClick}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      </ThemeProvider>
    )
    const shareIcon = container.querySelector('[data-testid="share-icon"]')
    expect(shareIcon).toBeInTheDocument()

    fireEvent.click(shareIcon.parentElement)
    expect(onShareClick).toHaveBeenCalled()
  })

  test('calls onEditClick when brush icon is clicked', () => {
    const onEditClick = jest.fn()
    const { container } = render(
      <ThemeProvider>
        <Vault
          vault={dummyVault}
          onClick={() => {}}
          onShareClick={() => {}}
          onEditClick={onEditClick}
          onDeleteClick={() => {}}
        />
      </ThemeProvider>
    )
    const brushIcon = container.querySelector('[data-testid="brush-icon"]')
    expect(brushIcon).toBeInTheDocument()
    fireEvent.click(brushIcon.parentElement)
    expect(onEditClick).toHaveBeenCalled()
  })

  test('matches snapshot when action icons are clicked', () => {
    const { asFragment, container } = render(
      <ThemeProvider>
        <Vault
          vault={dummyVault}
          onClick={() => {}}
          onShareClick={() => {}}
          onEditClick={() => {}}
          onDeleteClick={() => {}}
        />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot('initial state')

    const shareIcon = container.querySelector('[data-testid="share-icon"]')
    const brushIcon = container.querySelector('[data-testid="brush-icon"]')
    const deleteIcon = container.querySelector('[data-testid="delete-icon"]')

    fireEvent.click(shareIcon.parentElement)
    fireEvent.click(brushIcon.parentElement)
    fireEvent.click(deleteIcon.parentElement)

    expect(asFragment()).toMatchSnapshot('after action icons clicked')
  })
})
