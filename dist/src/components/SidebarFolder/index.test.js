import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SidebarFolder } from './index';
import '@testing-library/jest-dom';
const MockIcon = () => _jsx("div", { "data-testid": "mock-icon", children: "Icon" });
jest.mock('../PopupMenu', () => ({
    PopupMenu: ({ title, children }) => (_jsx("div", { "data-testid": "card-single-setting", "data-title": title, children: children }))
}));
jest.mock('../EditFolderPopupContent', () => ({
    EditFolderPopupContent: ({ title, children }) => (_jsx("div", { "data-testid": "edit-folder-popup-content", "data-title": title, children: children }))
}));
jest.mock('../../lib-react-components', () => ({
    ArrowDownIcon: () => _jsx("div", { "data-testid": "mock-arrow-icon" }),
    ArrowUpIcon: () => _jsx("div", { "data-testid": "mock-arrowUp-icon" }),
    FolderIcon: () => _jsx("div", { "data-testid": "mock-folder-icon" }),
    KebabMenuIcon: () => _jsx("div", { "data-testid": "mock-kebab-icon" }),
    PlusIcon: () => _jsx("div", { "data-testid": "mock-plus-icon" })
}));
describe('SidebarFolder Component', () => {
    const defaultProps = {
        isOpen: false,
        onClick: jest.fn(),
        onDropDown: jest.fn(),
        onAddClick: jest.fn(),
        isRoot: false,
        name: 'Test Folder',
        icon: MockIcon,
        isActive: false
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with default props', () => {
        const { container, getByText } = render(_jsx(ThemeProvider, { children: _jsx(SidebarFolder, { ...defaultProps }) }));
        expect(getByText('Test Folder')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onClick handler when clicked', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SidebarFolder, { ...defaultProps }) }));
        const wrapper = getByTestId('mock-arrowUp-icon');
        fireEvent.click(wrapper);
        expect(defaultProps.onDropDown).toHaveBeenCalledTimes(1);
    });
    test('renders with custom icon when provided', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SidebarFolder, { ...defaultProps }) }));
        expect(getByTestId('mock-icon')).toBeInTheDocument();
    });
});
//# sourceMappingURL=index.test.js.map