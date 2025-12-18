import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
jest.mock('pearpass-utils-password-check', () => ({
    checkPasswordStrength: jest.fn(),
    checkPassphraseStrength: jest.fn()
}));
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import '@testing-library/jest-dom';
import { PearPassInputField } from '.';
describe('PearPassInputField Component', () => {
    test('renders placeholder and error message', () => {
        const { getByPlaceholderText, getByText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "test value", placeholder: "Enter text", error: "Error occurred" }) }));
        expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
        expect(getByText('Error occurred')).toBeInTheDocument();
    });
    test('calls onChange when input changes if not disabled', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "", placeholder: "Enter text", onChange: handleChange }) }));
        const input = getByPlaceholderText('Enter text');
        fireEvent.change(input, { target: { value: 'new value' } });
        expect(handleChange).toHaveBeenCalledWith('new value');
    });
    test('does not call onChange when disabled', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "", placeholder: "Enter text", onChange: handleChange, isDisabled: true }) }));
        const input = getByPlaceholderText('Enter text');
        fireEvent.change(input, { target: { value: 'should not change' } });
        expect(handleChange).not.toHaveBeenCalled();
    });
    test('displays an error message when error prop is provided', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "test", placeholder: "Enter text", error: "This field is required" }) }));
        expect(getByText('This field is required')).toBeInTheDocument();
    });
    test('does not display error message when error prop is empty', () => {
        const { queryByText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "test", placeholder: "Enter text", error: "" }) }));
        expect(queryByText('This field is required')).not.toBeInTheDocument();
    });
    test('renders input as disabled when isDisabled is true', () => {
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "test", placeholder: "Enter text", isDisabled: true }) }));
        const input = getByPlaceholderText('Enter text');
        expect(input).toBeDisabled();
    });
    test('matches snapshot for default variant', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "snapshot test", placeholder: "Enter text", label: "Label" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot for outline variant', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(PearPassInputField, { value: "outline snapshot", placeholder: "Enter text", label: "Outline Label", variant: "outline" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map