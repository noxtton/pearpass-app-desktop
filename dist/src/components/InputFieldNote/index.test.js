import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { InputFieldNote } from './index';
import '@testing-library/jest-dom';
jest.mock('@lingui/react', () => ({
    useLingui: () => ({
        i18n: {
            _: (str) => str
        }
    }),
    I18nProvider: ({ children }) => children
}));
describe('InputFieldNote', () => {
    test('renders with default props', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, {}) }));
        expect(container).toMatchSnapshot();
    });
    test('renders with custom value', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { value: "Test note" }) }));
        expect(container).toMatchSnapshot();
        expect(screen.getByDisplayValue('Test note')).toBeInTheDocument();
    });
    test('renders with custom icon', () => {
        const CustomIcon = () => _jsx("div", { "data-testid": "custom-icon", children: "Custom Icon" });
        render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { icon: CustomIcon }) }));
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
    test('renders with error message', () => {
        render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { error: "Error message" }) }));
        expect(screen.getByText('Error message')).toBeInTheDocument();
    });
    test('calls onChange when input changes', () => {
        const handleChange = jest.fn();
        render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { onChange: handleChange }) }));
        const input = screen.getByPlaceholderText('Add note');
        fireEvent.change(input, { target: { value: 'New note' } });
        expect(handleChange).toHaveBeenCalled();
    });
    test('renders with disabled state', () => {
        render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { isDisabled: true }) }));
        expect(screen.getByPlaceholderText('Add note')).toHaveAttribute('readonly');
    });
    test('renders with custom variant', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputFieldNote, { variant: "default" }) }));
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map