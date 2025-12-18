import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SidebarSearch } from './index';
import '@testing-library/jest-dom';
jest.mock('../../lib-react-components', () => ({
    SearchIcon: () => _jsx("div", { "data-testid": "search-icon", children: "SearchIcon" })
}));
jest.mock('@lingui/react', () => ({
    useLingui: () => ({
        i18n: { _: (str) => str }
    })
}));
describe('SidebarSearch Component', () => {
    const defaultProps = {
        value: '',
        onChange: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with default props', () => {
        const { container, getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SidebarSearch, { ...defaultProps }) }));
        expect(getByTestId('search-icon')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onChange handler when input changes', () => {
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(SidebarSearch, { ...defaultProps }) }));
        const input = getByPlaceholderText('Search folder...');
        fireEvent.change(input, { target: { value: 'test search' } });
        expect(defaultProps.onChange).toHaveBeenCalledWith('test search');
    });
    test('displays the current value in the input', () => {
        const props = {
            ...defaultProps,
            value: 'current search'
        };
        const { getByDisplayValue } = render(_jsx(ThemeProvider, { children: _jsx(SidebarSearch, { ...props }) }));
        expect(getByDisplayValue('current search')).toBeInTheDocument();
    });
    test('has the correct placeholder text', () => {
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(SidebarSearch, { ...defaultProps }) }));
        expect(getByPlaceholderText('Search folder...')).toBeInTheDocument();
    });
    test('input has search type attribute', () => {
        const { getByPlaceholderText } = render(_jsx(ThemeProvider, { children: _jsx(SidebarSearch, { ...defaultProps }) }));
        const input = getByPlaceholderText('Search folder...');
        expect(input).toHaveAttribute('type', 'search');
    });
});
//# sourceMappingURL=index.test.js.map