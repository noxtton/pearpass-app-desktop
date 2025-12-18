import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { FormGroup } from './index';
import '@testing-library/jest-dom';
jest.mock('../../lib-react-components', () => ({
    ArrowDownIcon: () => _jsx("div", { "data-testid": "arrow-down-icon", children: "ArrowDown" }),
    ArrowUpIcon: () => _jsx("div", { "data-testid": "arrow-up-icon", children: "ArrowUp" })
}));
describe('FormGroup', () => {
    const mockTitle = 'Test Title';
    const mockChildren = _jsx("div", { "data-testid": "test-children", children: "Test Children" });
    test('renders with children and title when isCollapse is true', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormGroup, { title: mockTitle, isCollapse: true, children: mockChildren }) }));
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders without title section when isCollapse is false', () => {
        render(_jsx(FormGroup, { title: mockTitle, isCollapse: false, children: mockChildren }));
        expect(screen.queryByText(mockTitle)).not.toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
    test('toggles collapse state when title is clicked', () => {
        render(_jsx(ThemeProvider, { children: _jsx(FormGroup, { title: mockTitle, isCollapse: true, children: mockChildren }) }));
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
        fireEvent.click(screen.getByText(mockTitle));
        expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
        expect(screen.queryByTestId('arrow-up-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('arrow-down-icon')).toBeInTheDocument();
        fireEvent.click(screen.getByText(mockTitle));
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(screen.getByTestId('arrow-up-icon')).toBeInTheDocument();
    });
    test('does not render when children is not provided', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormGroup, { title: mockTitle, isCollapse: true }) }));
        expect(container.firstChild).toBeNull();
    });
    test('renders without title when title is empty string', () => {
        render(_jsx(ThemeProvider, { children: _jsx(FormGroup, { title: "", isCollapse: true, children: mockChildren }) }));
        expect(screen.queryByTestId('arrow-up-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
    test('renders without title when title is undefined', () => {
        render(_jsx(FormGroup, { isCollapse: true, children: mockChildren }));
        expect(screen.queryByTestId('arrow-up-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
});
//# sourceMappingURL=index.test.js.map