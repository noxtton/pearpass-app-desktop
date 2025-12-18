import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { RecordSortActionsPopupContent } from './index';
import '@testing-library/jest-dom';
jest.mock('../../lib-react-components', () => ({
    CheckIcon: () => _jsx("svg", { "data-testid": "check-icon" })
}));
describe('RecordSortActionsPopupContent Component', () => {
    const mockMenuItems = [
        {
            name: 'Recent',
            type: 'recent',
            icon: () => _jsx("svg", { "data-testid": "recent-icon" })
        },
        {
            name: 'Newest First',
            type: 'newToOld',
            icon: () => _jsx("svg", { "data-testid": "new-to-old-icon" })
        },
        {
            name: 'Oldest First',
            type: 'oldToNew',
            icon: () => _jsx("svg", { "data-testid": "old-to-new-icon" })
        }
    ];
    const mockOnClick = jest.fn();
    const mockOnClose = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with all menu items', () => {
        const { getByText, queryAllByTestId, container } = render(_jsx(ThemeProvider, { children: _jsx(RecordSortActionsPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick, onClose: mockOnClose }) }));
        expect(getByText('Recent')).toBeInTheDocument();
        expect(getByText('Newest First')).toBeInTheDocument();
        expect(getByText('Oldest First')).toBeInTheDocument();
        expect(queryAllByTestId(/.*-icon/).length).toBe(3);
        expect(container).toMatchSnapshot();
    });
    test('shows check icon for selected item', () => {
        const { queryAllByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordSortActionsPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick, onClose: mockOnClose, selectedType: "newToOld" }) }));
        expect(queryAllByTestId('check-icon').length).toBe(1);
    });
    test('calls onClick and onClose when menu item is clicked', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(RecordSortActionsPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick, onClose: mockOnClose }) }));
        fireEvent.click(getByText('Recent'));
        expect(mockOnClick).toHaveBeenCalledWith('recent');
        expect(mockOnClose).toHaveBeenCalled();
    });
    test('renders correctly with no selected item', () => {
        const { queryAllByTestId } = render(_jsx(ThemeProvider, { children: _jsx(RecordSortActionsPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick, onClose: mockOnClose, selectedType: null }) }));
        expect(queryAllByTestId('check-icon').length).toBe(0);
    });
    test('renders correctly with empty menu items', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(RecordSortActionsPopupContent, { menuItems: [], onClick: mockOnClick, onClose: mockOnClose }) }));
        expect(container.firstChild).toBeEmptyDOMElement();
    });
});
//# sourceMappingURL=index.test.js.map