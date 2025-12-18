import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { MenuDropdownItem } from './index';
import '@testing-library/jest-dom';
describe('MenuDropdownItem', () => {
    const mockOnClick = jest.fn();
    beforeEach(() => {
        mockOnClick.mockClear();
    });
    test('renders correctly with name', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item' }, onClick: mockOnClick }) }));
        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onClick when clicked', async () => {
        render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item' }, onClick: mockOnClick }) }));
        const item = screen.getByText('Test Item');
        item.click();
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    test('renders with custom icon when provided', () => {
        const CustomIcon = () => _jsx("div", { "data-testid": "custom-icon", children: "Custom" });
        render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item', icon: CustomIcon }, onClick: mockOnClick }) }));
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
    test('renders with default FolderIcon when no icon is provided', () => {
        render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item' }, onClick: mockOnClick }) }));
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
    test('renders with custom color when provided', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item', color: 'red' }, onClick: mockOnClick }) }));
        expect(container).toMatchSnapshot();
    });
    test('does not throw when onClick is not provided', () => {
        expect(() => {
            render(_jsx(ThemeProvider, { children: _jsx(MenuDropdownItem, { item: { name: 'Test Item' } }) }));
        }).not.toThrow();
    });
});
//# sourceMappingURL=index.test.js.map