import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ButtonRoundIcon } from './index';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import '@testing-library/jest-dom';
const DummyIcon = ArrowDownIcon;
describe('ButtonRoundIcon Component', () => {
    test('renders correctly with children and onClick handler', () => {
        const handleClick = jest.fn();
        const { getByText, getByRole } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: handleClick, children: "Round Button" }) }));
        const buttonText = getByText('Round Button');
        expect(buttonText).toBeInTheDocument();
        fireEvent.click(getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('renders with startIcon correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: handleClick, startIcon: DummyIcon, children: "Round Button With Icon" }) }));
        const icons = container.querySelectorAll('svg');
        expect(icons.length).toBe(1);
        icons.forEach((icon) => {
            expect(icon.getAttribute('width') || icon.getAttribute('size')).toBe('24');
            expect(icon.getAttribute('height') || icon.getAttribute('size')).toBe('24');
        });
    });
    test('does not render startIcon if not provided', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: () => { }, children: "No Icon" }) }));
        const icons = container.querySelectorAll('svg');
        expect(icons.length).toBe(0);
    });
    test('matches snapshot for default rendering', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: handleClick, startIcon: DummyIcon, children: "Snapshot Round Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('renders correctly when children is a React element', () => {
        const handleClick = jest.fn();
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: handleClick, startIcon: DummyIcon, children: _jsx("span", { children: "Element Child" }) }) }));
        expect(getByText('Element Child')).toBeInTheDocument();
    });
    test('button has type="button"', () => {
        const { getByRole } = render(_jsx(ThemeProvider, { children: _jsx(ButtonRoundIcon, { onClick: () => { }, children: "Type Button" }) }));
        expect(getByRole('button')).toHaveAttribute('type', 'button');
    });
});
//# sourceMappingURL=index.test.js.map