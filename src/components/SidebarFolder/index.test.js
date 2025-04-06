import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { SidebarFolder } from './index'
import '@testing-library/jest-dom'

const MockIcon = () => <div data-testid="mock-icon">Icon</div>

describe('SidebarFolder Component', () => {
  const defaultProps = {
    isOpen: false,
    onClick: jest.fn(),
    onDropDown: jest.fn(),
    onAddClick: jest.fn(),
    isRoot: false,
    name: 'Test Folder',
    icon: MockIcon,
    isActive: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with default props', () => {
    const { container, getByText } = render(
      <ThemeProvider>
        <SidebarFolder {...defaultProps} />
      </ThemeProvider>
    )
    expect(getByText('Test Folder')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('calls onClick handler when clicked', () => {
    const { getByText } = render(
      <ThemeProvider>
        <SidebarFolder {...defaultProps} />
      </ThemeProvider>
    )
    fireEvent.click(getByText('Test Folder').closest('div'))
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })

  test('renders with custom icon when provided', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <SidebarFolder {...defaultProps} />
      </ThemeProvider>
    )
    expect(getByTestId('mock-icon')).toBeInTheDocument()
  })
})
