import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, act } from '@testing-library/react';
import { RouterProvider, useRouter } from './RouterContext';
const TestComponent = () => {
    const { currentPage, data, navigate } = useRouter();
    return (_jsxs("div", { children: [_jsx("div", { "data-testid": "current-page", children: currentPage }), _jsx("div", { "data-testid": "record-id", children: data.recordId }), _jsx("div", { "data-testid": "record-type", children: data.recordType }), _jsx("button", { "data-testid": "navigate-button", onClick: () => navigate('test-page', { recordId: '123', recordType: 'password' }), children: "Navigate" })] }));
};
describe('RouterContext', () => {
    test('should provide initial router state', () => {
        const { getByTestId } = render(_jsx(RouterProvider, { children: _jsx(TestComponent, {}) }));
        expect(getByTestId('current-page').textContent).toBe('loading');
        expect(getByTestId('record-id').textContent).toBe('');
        expect(getByTestId('record-type').textContent).toBe('all');
    });
    test('should navigate to a new page with data', () => {
        const { getByTestId } = render(_jsx(RouterProvider, { children: _jsx(TestComponent, {}) }));
        expect(getByTestId('current-page').textContent).toBe('loading');
        act(() => {
            getByTestId('navigate-button').click();
        });
        expect(getByTestId('current-page').textContent).toBe('test-page');
        expect(getByTestId('record-id').textContent).toBe('123');
        expect(getByTestId('record-type').textContent).toBe('password');
    });
    test('should handle multiple navigation events', () => {
        const MultiNavComponent = () => {
            const { currentPage, navigate } = useRouter();
            return (_jsxs("div", { children: [_jsx("div", { "data-testid": "current-page", children: currentPage }), _jsx("button", { "data-testid": "nav1", onClick: () => navigate('page1'), children: "Nav1" }), _jsx("button", { "data-testid": "nav2", onClick: () => navigate('page2'), children: "Nav2" })] }));
        };
        const { getByTestId } = render(_jsx(RouterProvider, { children: _jsx(MultiNavComponent, {}) }));
        expect(getByTestId('current-page').textContent).toBe('loading');
        act(() => {
            getByTestId('nav1').click();
        });
        expect(getByTestId('current-page').textContent).toBe('page1');
        act(() => {
            getByTestId('nav2').click();
        });
        expect(getByTestId('current-page').textContent).toBe('page2');
    });
});
//# sourceMappingURL=RouterContext.test.js.map