import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ButtonSecondary } from './index';
import '@testing-library/jest-dom';
describe('ButtonSecondary Component', () => {
    test('renders correctly with children and onClick handler', () => {
        const handleClick = jest.fn();
        const { getByText } = render(_jsx(ThemeProvider, { children: _jsx(ButtonSecondary, { onClick: handleClick, children: "Secondary Button" }) }));
        const buttonText = getByText('Secondary Button');
        expect(buttonText).toBeInTheDocument();
        fireEvent.click(buttonText);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('applies type prop correctly', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonSecondary, { onClick: handleClick, type: "submit", children: "Submit Button" }) }));
        const buttonElement = container.querySelector('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement.getAttribute('type')).toBe('submit');
    });
    test('matches snapshot with default size ("md")', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonSecondary, { onClick: handleClick, children: "Snapshot Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot with small size ("sm")', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonSecondary, { onClick: handleClick, size: "sm", children: "Small Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
    test('matches snapshot with large size ("lg")', () => {
        const handleClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ButtonSecondary, { onClick: handleClick, size: "lg", children: "Large Button" }) }));
        expect(container.firstChild).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map