import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import '@testing-library/jest-dom';
import { SwitchWithLabel } from './index';
jest.mock('../../lib-react-components', () => ({
    Switch: ({ isOn }) => (_jsx("div", { "data-testid": "switch", "data-is-on": isOn, children: "Switch Component" }))
}));
describe('SwitchWithLabel Component', () => {
    const defaultProps = {
        isOn: false,
        onChange: jest.fn(),
        label: 'Test Label',
        isLabelBold: false
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with default props', () => {
        const { container, getByText, getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SwitchWithLabel, { ...defaultProps }) }));
        expect(getByText('Test Label')).toBeInTheDocument();
        expect(getByTestId('switch')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    test('calls onChange handler when clicked', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(SwitchWithLabel, { ...defaultProps }) }));
        fireEvent.click(container.firstChild);
        expect(defaultProps.onChange).toHaveBeenCalledWith(true);
    });
    test('toggles from on to off when clicked', () => {
        const props = {
            ...defaultProps,
            isOn: true
        };
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(SwitchWithLabel, { ...props }) }));
        fireEvent.click(container.firstChild);
        expect(props.onChange).toHaveBeenCalledWith(false);
    });
    test('renders switch with correct isOn state', () => {
        const props = {
            ...defaultProps,
            isOn: true
        };
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(SwitchWithLabel, { ...props }) }));
        const switchComponent = getByTestId('switch');
        expect(switchComponent).toHaveAttribute('data-is-on', 'true');
    });
    test('does not throw when onChange is not provided', () => {
        const props = {
            ...defaultProps,
            onChange: undefined
        };
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(SwitchWithLabel, { ...props }) }));
        expect(() => {
            fireEvent.click(container.firstChild);
        }).not.toThrow();
    });
});
//# sourceMappingURL=index.test.js.map