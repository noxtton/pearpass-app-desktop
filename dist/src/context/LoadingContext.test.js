import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, act } from '@testing-library/react';
import { LoadingProvider, useLoadingContext, useGlobalLoading } from './LoadingContext';
import '@testing-library/jest-dom';
jest.mock('../components/LoadingOverlay', () => ({
    LoadingOverlay: () => 'LoadingOverlay'
}));
describe('LoadingContext', () => {
    describe('LoadingProvider', () => {
        it('should render children', () => {
            const { getByText } = render(_jsx(LoadingProvider, { children: _jsx("div", { children: "Test Child" }) }));
            expect(getByText('Test Child')).toBeInTheDocument();
        });
        it('should show LoadingOverlay when loading', () => {
            const { container } = render(_jsx(LoadingProvider, { children: _jsx("div", { children: "Test Child" }) }));
            expect(container.innerHTML).not.toContain('LoadingOverlay');
            const TestComponent = () => {
                const { setIsLoading } = useLoadingContext();
                return _jsx("button", { onClick: () => setIsLoading(true), children: "Load" });
            };
            const { getByText } = render(_jsx(LoadingProvider, { children: _jsx(TestComponent, {}) }));
            act(() => {
                getByText('Load').click();
            });
            expect(container.innerHTML).toContain('Test Child');
        });
    });
    describe('useLoadingContext', () => {
        it('should provide loading state and setter', () => {
            let contextValue;
            const TestComponent = () => {
                contextValue = useLoadingContext();
                return null;
            };
            render(_jsx(LoadingProvider, { children: _jsx(TestComponent, {}) }));
            expect(contextValue.isLoading).toBe(false);
            expect(typeof contextValue.setIsLoading).toBe('function');
            act(() => {
                contextValue.setIsLoading(true);
            });
            expect(contextValue.isLoading).toBe(true);
        });
    });
    describe('useGlobalLoading', () => {
        it('should set loading state based on props', () => {
            let contextValue;
            const TestComponent = ({ isLoading }) => {
                useGlobalLoading({ isLoading });
                contextValue = useLoadingContext();
                return null;
            };
            const { rerender } = render(_jsx(LoadingProvider, { children: _jsx(TestComponent, { isLoading: false }) }));
            expect(contextValue.isLoading).toBe(false);
            rerender(_jsx(LoadingProvider, { children: _jsx(TestComponent, { isLoading: true }) }));
            expect(contextValue.isLoading).toBe(true);
        });
        it('should not set loading state when isLoading is not boolean', () => {
            let contextValue;
            const TestComponent = ({ isLoading }) => {
                useGlobalLoading({ isLoading });
                contextValue = useLoadingContext();
                return null;
            };
            render(_jsx(LoadingProvider, { children: _jsx(TestComponent, { isLoading: undefined }) }));
            expect(contextValue.isLoading).toBe(false);
        });
    });
});
//# sourceMappingURL=LoadingContext.test.js.map