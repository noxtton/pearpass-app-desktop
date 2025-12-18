import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { NoticeText } from './index';
import '@testing-library/jest-dom';
describe('NoticeText Component', () => {
    test('renders success type correctly', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(NoticeText, { text: "Success message", type: "success" }) }));
        expect(getByText('Success message')).toBeInTheDocument();
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement.getAttribute('width')).toBe('10px');
    });
    test('renders error type correctly', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(NoticeText, { text: "Error message", type: "error" }) }));
        expect(getByText('Error message')).toBeInTheDocument();
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement.getAttribute('width')).toBe('10px');
    });
    test('renders warning type correctly', () => {
        const { getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(NoticeText, { text: "Warning message", type: "warning" }) }));
        expect(getByText('Warning message')).toBeInTheDocument();
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement.getAttribute('width')).toBe('10px');
    });
    test('matches snapshot for success type', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(NoticeText, { text: "Snapshot Success", type: "success" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map