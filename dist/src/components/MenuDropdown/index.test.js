import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { MenuDropdown } from './index';
import '@testing-library/jest-dom';
jest.mock('./MenuDropdownItem', () => ({
    MenuDropdownItem: ({ item, onClick }) => (_jsx("div", { "data-testid": "menu-dropdown-item", onClick: onClick, children: item.name }))
}));
jest.mock('./MenuDropdownLabel', () => ({
    MenuDropdownLabel: ({ selectedItem, isOpen, setIsOpen }) => (_jsxs("div", { "data-testid": "menu-dropdown-label", onClick: () => setIsOpen && setIsOpen(!isOpen), children: [selectedItem ? selectedItem.name : 'No selected item', isOpen ? 'Open' : 'Closed'] }))
}));
jest.mock('../../hooks/useOutsideClick', () => ({
    useOutsideClick: jest.fn()
}));
describe('MenuDropdown', () => {
    const mockOnItemSelect = jest.fn();
    const mockItems = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    beforeEach(() => {
        mockOnItemSelect.mockClear();
    });
    const renderComponent = (props = {}) => render(_jsx(ThemeProvider, { children: _jsx(MenuDropdown, { items: mockItems, onItemSelect: mockOnItemSelect, ...props }) }));
    test('renders both dropdown labels', () => {
        const { container } = renderComponent();
        const labels = screen.getAllByTestId('menu-dropdown-label');
        expect(labels).toHaveLength(2);
        expect(container).toMatchSnapshot();
    });
    test('does not show dropdown items when closed', () => {
        renderComponent();
        expect(screen.queryAllByTestId('menu-dropdown-item')).toHaveLength(0);
    });
    test('shows dropdown items when open', () => {
        renderComponent();
        const visibleLabel = screen.getAllByTestId('menu-dropdown-label')[1];
        fireEvent.click(visibleLabel);
        expect(screen.getAllByTestId('menu-dropdown-item')).toHaveLength(3);
    });
    test('filters out selected item from dropdown options', () => {
        const selectedItem = mockItems[0];
        renderComponent({ selectedItem });
        const visibleLabel = screen.getAllByTestId('menu-dropdown-label')[1];
        fireEvent.click(visibleLabel);
        const shownItems = screen.getAllByTestId('menu-dropdown-item');
        expect(shownItems).toHaveLength(2);
        expect(shownItems[0]).toHaveTextContent('Item 2');
        expect(shownItems[1]).toHaveTextContent('Item 3');
    });
    test('calls onItemSelect when an item is clicked', () => {
        renderComponent();
        const visibleLabel = screen.getAllByTestId('menu-dropdown-label')[1];
        fireEvent.click(visibleLabel);
        const items = screen.getAllByTestId('menu-dropdown-item');
        fireEvent.click(items[1]);
        expect(mockOnItemSelect).toHaveBeenCalledWith(mockItems[1]);
    });
    test('closes dropdown after item selection', () => {
        renderComponent();
        const visibleLabel = screen.getAllByTestId('menu-dropdown-label')[1];
        fireEvent.click(visibleLabel);
        const items = screen.getAllByTestId('menu-dropdown-item');
        fireEvent.click(items[0]);
        expect(screen.queryAllByTestId('menu-dropdown-item')).toHaveLength(0);
    });
});
//# sourceMappingURL=index.test.js.map