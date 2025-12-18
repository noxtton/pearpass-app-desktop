import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SelectItem } from './index';
import '@testing-library/jest-dom';
describe('SelectItem Component', () => {
    const mockOnClick = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with item name', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(SelectItem, { item: { label: 'English' }, onClick: mockOnClick }) }));
        expect(getByText('English')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onClick when clicked', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(SelectItem, { item: { label: 'English' }, onClick: mockOnClick }) }));
        fireEvent.click(getByText('English'));
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    test('renders correctly with a different item name', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(SelectItem, { item: { label: 'Spanish' }, onClick: mockOnClick }) }));
        expect(getByText('Spanish')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map