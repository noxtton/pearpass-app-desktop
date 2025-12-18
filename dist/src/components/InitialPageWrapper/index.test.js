import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { InitialPageWrapper } from './index';
import '@testing-library/jest-dom';
describe('InitialPageWrapper', () => {
    const mockChildren = _jsx("div", { "data-testid": "test-children", children: "Test Children" });
    test('renders children correctly', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InitialPageWrapper, { children: mockChildren }) }));
        expect(screen.getByTestId('test-children')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('renders without children', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(InitialPageWrapper, {}) }));
        expect(screen.queryByTestId('test-children')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map