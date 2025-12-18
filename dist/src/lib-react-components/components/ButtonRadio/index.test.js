import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ButtonRadio } from './index';
import '@testing-library/jest-dom';
describe('ButtonRadio Component', () => {
    test('handles onClick event', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRadio, { onClick: handleClick }) }));
        fireEvent.click(container.querySelector('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('renders as a button element', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRadio, { onClick: () => { } }) }));
        expect(container.querySelector('button')).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map