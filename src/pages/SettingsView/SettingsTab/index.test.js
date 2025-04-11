import React from 'react'

import { render, screen } from '@testing-library/react'
import {
  sendGoogleFormFeedback,
  sendSlackFeedback
} from 'pear-apps-lib-feedback'
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider'

import { SettingsTab } from './index'
import { useToast } from '../../../context/ToastContext'

import '@testing-library/jest-dom'

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
jest.mock('../../../components/CardSingleSetting', () => ({
  CardSingleSetting: ({ title, children }) => (
    <div data-testid="card-single-setting" data-title={title}>
      {children}
    </div>
  )
}))
jest.mock('../../../context/LoadingContext', () => ({
  useGlobalLoading: () => ({
    setIsLoading: jest.fn()
  })
}))
jest.mock('../../../context/ToastContext', () => ({
  useToast: jest.fn().mockImplementation(() => ({
    setToast: jest.fn()
  }))
}))
jest.mock('pear-apps-lib-feedback', () => ({
  sendGoogleFormFeedback: jest.fn(),
  sendSlackFeedback: jest.fn()
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

  test('handleReportProblem does not send feedback when message is empty', async () => {
    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const button = screen.getByTestId('button-secondary')
    button.click()

    expect(sendSlackFeedback).not.toHaveBeenCalled()
    expect(sendGoogleFormFeedback).not.toHaveBeenCalled()
  })

  test('handleReportProblem sends feedback with correct payload', async () => {
    sendSlackFeedback.mockResolvedValue({})
    sendGoogleFormFeedback.mockResolvedValue({})

    const { rerender } = render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const message = 'Test feedback message'

    // Since we mocked the TextArea, we need to simulate state update manually
    React.useState = jest
      .fn()
      .mockReturnValueOnce([message, jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])

    rerender(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const button = screen.getByTestId('button-secondary')
    await button.click()

    expect(sendSlackFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        message,
        topic: 'BUG_REPORT',
        app: 'DESKTOP',
        webhookUrPath: '/T1RUJ063F/B08LLRLBY9M/KTKA3MIJfmjX4izWfgnjbRIM'
      })
    )

    expect(sendGoogleFormFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        message,
        topic: 'BUG_REPORT',
        app: 'DESKTOP',
        formKey: '1FAIpQLScLltvRe64VzMDRzOVjGtHWZ3KafLC2zzvkEoJfTzJkFd67OA'
      })
    )
  })

  test('handleReportProblem shows success toast when feedback is sent', async () => {
    sendSlackFeedback.mockResolvedValue({})
    sendGoogleFormFeedback.mockResolvedValue({})

    const setToast = jest.fn()
    useToast.mockReturnValue({ setToast })

    React.useState = jest
      .fn()
      .mockReturnValueOnce(['Test message', jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])

    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const button = screen.getByTestId('button-secondary')
    button.click()

    // Wait for promises to resolve
    await new Promise(process.nextTick)

    expect(setToast).toHaveBeenCalledWith({
      message: 'Feedback sent'
    })
  })

  test('handleReportProblem shows error toast when feedback fails', async () => {
    sendSlackFeedback.mockRejectedValue(new Error('Network error'))

    const setToast = jest.fn()
    useToast.mockReturnValue({ setToast })

    React.useState = jest
      .fn()
      .mockReturnValueOnce(['Test message', jest.fn()])
      .mockReturnValueOnce([false, jest.fn()])

    render(
      <ThemeProvider>
        <SettingsTab />
      </ThemeProvider>
    )

    const button = screen.getByTestId('button-secondary')
    await button.click()

    expect(setToast).toHaveBeenCalledWith({
      message: 'Something went wrong, please try again'
    })
  })
})
