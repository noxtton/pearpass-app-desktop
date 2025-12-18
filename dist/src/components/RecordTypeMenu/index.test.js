import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { RecordTypeMenu } from './index';
import '@testing-library/jest-dom';
jest.mock('../../hooks/useRecordMenuItems', () => ({
    useRecordMenuItems: () => ({
        defaultItems: [
            {
                name: 'Login',
                type: 'login',
                icon: () => _jsx("svg", { "data-testid": "login-icon" })
            },
            {
                name: 'Card',
                type: 'card',
                icon: () => _jsx("svg", { "data-testid": "card-icon" })
            },
            {
                name: 'Note',
                type: 'note',
                icon: () => _jsx("svg", { "data-testid": "note-icon" })
            }
        ]
    })
}));
jest.mock('../MenuDropdown', () => ({
    MenuDropdown: ({ selectedItem, onItemSelect, items }) => (_jsxs("div", { "data-testid": "menu-dropdown", children: [_jsx("div", { "data-testid": "selected-item", children: selectedItem?.name }), _jsx("ul", { children: items.map((item) => (_jsxs("li", { "data-testid": `menu-item-${item.type}`, onClick: () => onItemSelect(item), children: [item.name, item.icon && item.icon()] }, item.type))) })] }))
}));
describe('RecordTypeMenu Component', () => {
    const mockOnRecordSelect = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with no selected record', () => {
        const { getByTestId, container } = render(_jsx(ThemeProvider, { children: _jsx(RecordTypeMenu, { onRecordSelect: mockOnRecordSelect }) }));
        expect(getByTestId('menu-dropdown')).toBeInTheDocument();
        expect(getByTestId('selected-item')).toBeEmptyDOMElement();
        expect(container).toMatchSnapshot();
    });
    test('passes the correct selected item when selectedRecord is provided', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordTypeMenu, { selectedRecord: "card", onRecordSelect: mockOnRecordSelect }) }));
        expect(getByTestId('selected-item')).toHaveTextContent('Card');
    });
    test('calls onRecordSelect when a menu item is clicked', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordTypeMenu, { onRecordSelect: mockOnRecordSelect }) }));
        fireEvent.click(getByTestId('menu-item-login'));
        expect(mockOnRecordSelect).toHaveBeenCalledTimes(1);
        expect(mockOnRecordSelect).toHaveBeenCalledWith({
            name: 'Login',
            type: 'login',
            icon: expect.any(Function)
        });
    });
    test('renders all menu items from useRecordMenuItems hook', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordTypeMenu, { onRecordSelect: mockOnRecordSelect }) }));
        expect(getByTestId('menu-item-login')).toBeInTheDocument();
        expect(getByTestId('menu-item-card')).toBeInTheDocument();
        expect(getByTestId('menu-item-note')).toBeInTheDocument();
    });
    test('handles case when selectedRecord does not match any item', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordTypeMenu, { selectedRecord: "non-existent", onRecordSelect: mockOnRecordSelect }) }));
        expect(getByTestId('selected-item')).toBeEmptyDOMElement();
    });
});
//# sourceMappingURL=index.test.js.map