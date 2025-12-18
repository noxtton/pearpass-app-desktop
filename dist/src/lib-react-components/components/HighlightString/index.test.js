import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { HighlightString } from './index';
import '@testing-library/jest-dom';
describe('HighlightString Component', () => {
    test('renders plain text without numbers or symbols', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(HighlightString, { text: "Hello world" }) }));
        expect(getByText('Hello world')).toBeInTheDocument();
    });
    test('renders and highlights numbers and symbols correctly', () => {
        const { container, getByText } = render(_jsx(ThemeProvider, { children: _jsx(HighlightString, { text: "Hello 123!" }) }));
        expect(container).toHaveTextContent('Hello 123!');
        const numberElement = getByText('123');
        expect(numberElement).toBeInTheDocument();
        const symbolElement = getByText('!');
        expect(symbolElement).toBeInTheDocument();
        expect(numberElement.tagName.toLowerCase()).toBe('span');
        expect(symbolElement.tagName.toLowerCase()).toBe('span');
    });
    test('matches snapshot', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(HighlightString, { text: "Test 42, wow!" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map