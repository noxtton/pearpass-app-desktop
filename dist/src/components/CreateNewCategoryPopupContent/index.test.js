import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { CreateNewCategoryPopupContent } from './index';
import '@testing-library/jest-dom';
describe('CreateNewCategoryPopupContent', () => {
    const mockMenuItems = [
        { type: 'note', name: 'Note' },
        { type: 'email', name: 'Email' }
    ];
    const mockOnClick = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders menu items correctly', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(CreateNewCategoryPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick }) }));
        expect(getByText('Note')).toBeInTheDocument();
        expect(getByText('Email')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('calls onClick with correct item when menu item is clicked', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(CreateNewCategoryPopupContent, { menuItems: mockMenuItems, onClick: mockOnClick }) }));
        const noteMenuItem = getByText('Note');
        fireEvent.click(noteMenuItem);
        expect(mockOnClick).toHaveBeenCalledWith(mockMenuItems[0]);
    });
});
//# sourceMappingURL=index.test.js.map