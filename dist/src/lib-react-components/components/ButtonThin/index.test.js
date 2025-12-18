import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ButtonThin } from './index';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import '@testing-library/jest-dom';
const DummyIcon = ArrowDownIcon;
describe('ButtonThin Component', () => {
    test('renders correctly with children and onClick handler', () => {
        const handleClick = jest.fn();
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(ButtonThin, { onClick: handleClick, children: "Thin Button" }) }));
        const buttonText = getByText('Thin Button');
        expect(buttonText).toBeInTheDocument();
        fireEvent.click(buttonText);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('renders with startIcon and endIcon correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonThin, { onClick: handleClick, startIcon: DummyIcon, endIcon: DummyIcon, children: "Thin Button With Icons" }) }));
        const icons = container.querySelectorAll('svg');
        expect(icons.length).toBe(2);
        icons.forEach((icon) => {
            expect(icon.getAttribute('width')).toBe('24');
            expect(icon.getAttribute('height')).toBe('24');
        });
    });
    test('matches snapshot for default variant', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonThin, { onClick: handleClick, startIcon: DummyIcon, endIcon: DummyIcon, children: "Snapshot Thin Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot for grey variant', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonThin, { onClick: handleClick, startIcon: DummyIcon, endIcon: DummyIcon, variant: "grey", children: "Grey Thin Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map