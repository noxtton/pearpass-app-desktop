import React from 'react'

import { render } from '@testing-library/react'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { RecordAvatar } from './index'
import '@testing-library/jest-dom'

jest.mock('pearpass-lib-ui-react-components', () => ({
  CheckIcon: (props) => <svg data-testid="check-icon" {...props} />,
  StarIcon: (props) => <svg data-testid="star-icon" {...props} />
}))

describe('RecordAvatar Component', () => {
  const defaultProps = {
    initials: 'AB',
    color: '#FF5500'
  }

  test('renders initials when no avatarSrc is provided', () => {
    const { getByText, container } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} />
      </ThemeProvider>
    )

    expect(getByText('AB')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('renders image when avatarSrc is provided', () => {
    const { container } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} avatarSrc="test-avatar.jpg" />
      </ThemeProvider>
    )

    const img = container.querySelector('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'test-avatar.jpg')
  })

  test('renders selected state with check icon', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} isSelected={true} />
      </ThemeProvider>
    )

    expect(getByTestId('check-icon')).toBeInTheDocument()
  })

  test('renders favorite icon when isFavorite is true', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} isFavorite={true} />
      </ThemeProvider>
    )

    expect(getByTestId('star-icon')).toBeInTheDocument()
  })

  test('does not render favorite icon when isFavorite is false', () => {
    const { queryByTestId } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} isFavorite={false} />
      </ThemeProvider>
    )

    expect(queryByTestId('star-icon')).not.toBeInTheDocument()
  })

  test('applies size prop correctly', () => {
    const { container: mdContainer } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} size="md" />
      </ThemeProvider>
    )

    const { container: smContainer } = render(
      <ThemeProvider>
        <RecordAvatar {...defaultProps} size="sm" />
      </ThemeProvider>
    )

    expect(mdContainer.innerHTML).not.toEqual(smContainer.innerHTML)
  })
})
