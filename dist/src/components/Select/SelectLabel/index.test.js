import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SelectLabel } from './index';
import '@testing-library/jest-dom';
describe('SelectLabel Component', () => {
    const mockSetIsOpen = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with placeholder when no selected item', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(SelectLabel, { isOpen: false, setIsOpen: mockSetIsOpen, placeholder: "Select an option" }) }));
        expect(getByText('Select an option')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders correctly with selected item', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(SelectLabel, { selectedItem: { label: 'English' }, isOpen: false, setIsOpen: mockSetIsOpen, placeholder: "Select an option" }) }));
        expect(getByText('English')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders ArrowDownIcon when isOpen is false', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(SelectLabel, { isOpen: false, setIsOpen: mockSetIsOpen, placeholder: "Select an option" }) }));
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders ArrowUpIcon when isOpen is true', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(SelectLabel, { isOpen: true, setIsOpen: mockSetIsOpen, placeholder: "Select an option" }) }));
        expect(container.querySelector('svg')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls setIsOpen with the correct value when clicked', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(SelectLabel, { isOpen: false, setIsOpen: mockSetIsOpen, placeholder: "Select an option" }) }));
        fireEvent.click(getByText('Select an option'));
        expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
        expect(mockSetIsOpen).toHaveBeenCalledWith(true);
    });
});
//# sourceMappingURL=index.test.js.map