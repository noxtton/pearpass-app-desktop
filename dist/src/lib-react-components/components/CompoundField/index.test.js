import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { CompoundField } from './index';
import '@testing-library/jest-dom';
describe('CompoundField Component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(CompoundField, { children: _jsx("div", { children: "Compound Field Content" }) }) }));
        expect(getByText('Compound Field Content')).toBeInTheDocument();
    });
    test('matches snapshot when not disabled', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(CompoundField, { children: "Compound Field Content" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot when disabled', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(CompoundField, { isDisabled: true, children: "Compound Field Content" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map