import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { FormWrapper } from './index';
import '@testing-library/jest-dom';
describe('FormWrapper', () => {
    test('renders correctly', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(FormWrapper, {}) }));
        expect(container).toMatchSnapshot();
    });
    test('renders with children', () => {
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(FormWrapper, { children: _jsx("div", { children: "Test Child" }) }) }));
        expect(getByText('Test Child')).toBeInTheDocument();
    });
    test('renders multiple children in correct order', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsxs(FormWrapper, { children: [_jsx("div", { children: "First Child" }), _jsx("div", { children: "Second Child" }), _jsx("div", { children: "Third Child" })] }) }));
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map