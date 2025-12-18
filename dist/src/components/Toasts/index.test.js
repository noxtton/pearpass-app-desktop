import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { colors } from 'pearpass-lib-ui-theme-provider';
import { Toasts } from './index';
import '@testing-library/jest-dom';
jest.mock('./styles', () => ({
    ToastContainer: ({ children }) => (_jsx("div", { "data-testid": "toast-container", children: children })),
    ToastStack: ({ children }) => _jsx("div", { "data-testid": "toast-stack", children: children })
}));
describe('Toasts Component', () => {
    const mockIcon = jest.fn(() => _jsx("div", { "data-testid": "mock-icon", children: "Icon" }));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('renders correctly with toasts', () => {
        const toasts = [
            { message: 'Success message', icon: mockIcon },
            { message: 'Error message', icon: null }
        ];
        const { getByTestId, getAllByTestId, getByText, container } = render(_jsx(ThemeProvider, { children: _jsx(Toasts, { toasts: toasts }) }));
        expect(getByTestId('toast-stack')).toBeInTheDocument();
        expect(getAllByTestId('toast-container')).toHaveLength(2);
        expect(getByText('Success message')).toBeInTheDocument();
        expect(getByText('Error message')).toBeInTheDocument();
        expect(getByTestId('mock-icon')).toBeInTheDocument();
        // htm/react passes a second undefined argument
        expect(mockIcon).toHaveBeenCalledWith({ color: colors.black.mode1 }, undefined);
        expect(container).toMatchSnapshot();
    });
    test('renders correctly with empty toasts array', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(Toasts, { toasts: [] }) }));
        expect(getByTestId('toast-stack')).toBeInTheDocument();
    });
    test('renders correctly with undefined toasts', () => {
        const { getByTestId } = render(_jsx(ThemeProvider, { children: _jsx(Toasts, { toasts: undefined }) }));
        expect(getByTestId('toast-stack')).toBeInTheDocument();
    });
    test('passes correct color to icon', () => {
        const toasts = [{ message: 'Test message', icon: mockIcon }];
        render(_jsx(ThemeProvider, { children: _jsx(Toasts, { toasts: toasts }) }));
        expect(mockIcon).toHaveBeenCalledWith({ color: colors.black.mode1 }, undefined);
    });
});
//# sourceMappingURL=index.test.js.map