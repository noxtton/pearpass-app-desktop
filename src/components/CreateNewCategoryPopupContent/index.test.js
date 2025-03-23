import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { CreateNewCategoryPopupContent } from './index'
import '@testing-library/jest-dom'

describe('CreateNewCategoryPopupContent', () => {
  const mockMenuItems = [
    { type: 'note', name: 'Note' },
    { type: 'email', name: 'Email' }
  ]
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders menu items correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CreateNewCategoryPopupContent
          menuItems={mockMenuItems}
          onClick={mockOnClick}
        />
      </ThemeProvider>
    )

    expect(getByText('Note')).toBeInTheDocument()
    expect(getByText('Email')).toBeInTheDocument()
  })

  it('calls onClick with correct item when menu item is clicked', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CreateNewCategoryPopupContent
          menuItems={mockMenuItems}
          onClick={mockOnClick}
        />
      </ThemeProvider>
    )

    const noteMenuItem = getByText('Note')
    fireEvent.click(noteMenuItem)

    expect(mockOnClick).toHaveBeenCalledWith(mockMenuItems[0])
  })

  it('stops event propagation when menu item is clicked', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CreateNewCategoryPopupContent
          menuItems={mockMenuItems}
          onClick={mockOnClick}
        />
      </ThemeProvider>
    )

    const mockStopPropagation = jest.fn()
    const noteMenuItem = getByText('Note')
    fireEvent.click(noteMenuItem, {
      stopPropagation: mockStopPropagation
    })

    expect(mockStopPropagation).toHaveBeenCalled()
  })
})
