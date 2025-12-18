import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { Switch } from './index';
import '@testing-library/jest-dom';
describe('Switch Component', () => {
    test('toggles switch correctly when clicked', () => {
        const handleChange = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(Switch, { isOn: true, onChange: handleChange }) }));
        const background = container.firstChild;
        fireEvent.click(background);
        expect(handleChange).toHaveBeenCalledWith(false);
    });
    test('matches snapshot when switched on', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(Switch, { isOn: true, onChange: () => { } }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot when switched off', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(Switch, { isOn: false, onChange: () => { } }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map