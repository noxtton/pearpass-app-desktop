import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { InputSearch } from './index';
import '@testing-library/jest-dom';
jest.mock('@lingui/react', () => ({
    useLingui: () => ({
        i18n: {
            _: (str) => str
        }
    }),
    I18nProvider: ({ children }) => children
}));
jest.mock('../../lib-react-components', () => ({
    LockCircleIcon: () => _jsx("div", { "data-testid": "lock-circle-icon", children: "LockCircleIcon" })
}));
describe('InputSearch', () => {
    test('renders with default props', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "", onChange: jest.fn() }) }));
        expect(container).toMatchSnapshot();
    });
    test('renders with custom value', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "Test search", onChange: jest.fn() }) }));
        expect(container).toMatchSnapshot();
        expect(screen.getByDisplayValue('Test search')).toBeInTheDocument();
    });
    test('displays quantity when value is not empty', () => {
        render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "Test", onChange: jest.fn(), quantity: 5 }) }));
        expect(screen.getByText('5')).toBeInTheDocument();
    });
    test('does not display quantity when value is empty', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "", onChange: jest.fn(), quantity: 5 }) }));
        expect(container.textContent).not.toContain('5');
    });
    test('calls onChange when input changes', () => {
        const handleChange = jest.fn();
        render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "", onChange: handleChange }) }));
        const input = screen.getByPlaceholderText('Search...');
        fireEvent.change(input, { target: { value: 'New search' } });
        expect(handleChange).toHaveBeenCalled();
    });
    test('renders lock circle icon', () => {
        render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "", onChange: jest.fn() }) }));
        expect(screen.getByTestId('lock-circle-icon')).toBeInTheDocument();
    });
    test('has correct placeholder text', () => {
        render(_jsx(ThemeProvider, { children: _jsx(InputSearch, { value: "", onChange: jest.fn() }) }));
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    });
});
//# sourceMappingURL=index.test.js.map