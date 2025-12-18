import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SidebarCategory } from './index';
import '@testing-library/jest-dom';
const MockIcon = () => _jsx("div", { "data-testid": "mock-icon", children: "Icon" });
describe('SidebarCategory Component', () => {
    const defaultProps = {
        categoryName: 'Test Category',
        quantity: 5,
        color: '#ff0000',
        icon: MockIcon,
        onClick: jest.fn(),
        isSelected: false,
        size: 'default'
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with default props', () => {
        const { container, getByText, getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SidebarCategory, { ...defaultProps }) }));
        expect(getByText((content) => content.includes('Test Category'))).toBeInTheDocument();
        expect(getByText('5')).toBeInTheDocument();
        expect(getByTestId('mock-icon')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onClick handler when clicked', () => {
        const { getByText } = render(_jsxs(ThemeProvider, { children: [_jsx(SidebarCategory, { ...defaultProps }), ' '] }));
        fireEvent.click(getByText('Test Category'));
        expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });
    test('renders with zero quantity', () => {
        const { getByText } = render(_jsxs(ThemeProvider, { children: [_jsx(SidebarCategory, { ...defaultProps, quantity: 0 }), ' '] }));
        expect(getByText('0')).toBeInTheDocument();
    });
});
//# sourceMappingURL=index.test.js.map