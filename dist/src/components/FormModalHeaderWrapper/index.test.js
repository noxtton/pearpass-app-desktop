import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { FormModalHeaderWrapper } from './index';
import '@testing-library/jest-dom';
describe('FormModalHeaderWrapper', () => {
    const mockChildren = _jsx("div", { "data-testid": "test-children", children: "Test Children" });
    const mockButtons = _jsx("div", { "data-testid": "test-buttons", children: "Test Buttons" });
    test('renders children and buttons correctly', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormModalHeaderWrapper, { children: mockChildren, buttons: mockButtons }) }));
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(screen.getByTestId('test-buttons')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders without children', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormModalHeaderWrapper, { buttons: mockButtons }) }));
        expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-buttons')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders without buttons', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormModalHeaderWrapper, { children: mockChildren }) }));
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(screen.queryByTestId('test-buttons')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders with empty content', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormModalHeaderWrapper, {}) }));
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map