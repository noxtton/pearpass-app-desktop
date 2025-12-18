import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ButtonLittle } from './index';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import '@testing-library/jest-dom';
const DummyIcon = ArrowDownIcon;
describe('ButtonLittle Component', () => {
    test('renders correctly with children and onClick handler', () => {
        const handleClick = jest.fn();
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(ButtonLittle, { onClick: handleClick, children: "Little Button" }) }));
        const buttonText = getByText('Little Button');
        expect(buttonText).toBeInTheDocument();
        fireEvent.click(buttonText);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('renders with startIcon correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonLittle, { onClick: handleClick, startIcon: DummyIcon, children: "Little Button" }) }));
        const dummyIcon = container.querySelector('svg');
        expect(dummyIcon).toBeInTheDocument();
        expect(dummyIcon.getAttribute('width')).toBe('24px');
        expect(dummyIcon.getAttribute('height')).toBe('24px');
    });
    test('renders as icon-only when no children provided', () => {
        const handleClick = jest.fn();
        const { queryByText, container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonLittle, { onClick: handleClick, startIcon: DummyIcon }) }));
        const text = queryByText(/./);
        expect(text).toBeNull();
        const dummyIcon = container.querySelector('svg');
        expect(dummyIcon).toBeInTheDocument();
    });
    test('applies type prop correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonLittle, { onClick: handleClick, type: "submit", children: "Submit Button" }) }));
        const buttonElement = container.querySelector('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.getAttribute('type')).toBe('submit');
    });
    test('matches snapshot', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonLittle, { onClick: handleClick, startIcon: DummyIcon, children: "Snapshot Little Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map