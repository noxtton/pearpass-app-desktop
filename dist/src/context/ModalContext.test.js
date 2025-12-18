import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ModalProvider, useModal } from './ModalContext';
import { BASE_TRANSITION_DURATION } from '../constants/transitions';
import '@testing-library/jest-dom';
jest.mock('pear-apps-utils-generate-unique-id', () => ({
    generateUniqueId: jest.fn(() => 'unique-id')
}));
jest.mock('../components/Overlay', () => ({
    Overlay: ({ onClick, type, isOpen }) => (_jsxs("div", { "data-testid": "overlay", onClick: onClick, children: ["Overlay: ", type, ", isOpen: ", isOpen.toString()] }))
}));
jest.mock('../containers/Modal', () => ({
    ModalWrapper: ({ children }) => (_jsx("div", { "data-testid": "modal-wrapper", children: children }))
}));
jest.mock('../containers/Modal/SideDrawer', () => ({
    SideDrawer: ({ children, isOpen }) => (_jsx("div", { "data-testid": "side-drawer", "data-open": isOpen.toString(), children: children }))
}));
const TestComponent = () => {
    const { setModal, closeModal, isOpen } = useModal();
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => setModal(_jsx("div", { "data-testid": "modal-content", children: "Modal Content" })), children: "Open Modal" }), _jsx("button", { onClick: closeModal, children: "Close Modal" }), _jsx("div", { "data-testid": "is-open", children: isOpen.toString() })] }));
};
const TestSideDrawerComponent = () => {
    const { setModal, isOpen } = useModal();
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => setModal(_jsx("div", { "data-testid": "side-drawer-content", children: "Side Drawer Content" }), { modalType: 'sideDrawer' }), children: "Open Side Drawer Modal" }), _jsx("div", { "data-testid": "is-open", children: isOpen.toString() })] }));
};
describe('ModalProvider', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });
    test('renders children', () => {
        render(_jsx(ModalProvider, { children: _jsx("div", { "data-testid": "child", children: "Child Content" }) }));
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
    test('opens and closes default modal using setModal and closeModal', () => {
        render(_jsx(ModalProvider, { children: _jsx(TestComponent, {}) }));
        expect(screen.getByTestId('is-open').textContent).toBe('false');
        fireEvent.click(screen.getByText('Open Modal'));
        expect(screen.getByTestId('is-open').textContent).toBe('true');
        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Close Modal'));
        act(() => {
            jest.advanceTimersByTime(BASE_TRANSITION_DURATION);
        });
        expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
    test('closes modal on Escape key press', () => {
        render(_jsx(ModalProvider, { children: _jsx(TestComponent, {}) }));
        fireEvent.click(screen.getByText('Open Modal'));
        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
        fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
        act(() => {
            jest.advanceTimersByTime(BASE_TRANSITION_DURATION);
        });
        expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
    test('closes modal on overlay click', () => {
        render(_jsx(ModalProvider, { children: _jsx(TestComponent, {}) }));
        fireEvent.click(screen.getByText('Open Modal'));
        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('overlay'));
        act(() => {
            jest.advanceTimersByTime(BASE_TRANSITION_DURATION);
        });
        expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
    });
    test('renders sideDrawer modal correctly', () => {
        render(_jsx(ModalProvider, { children: _jsx(TestSideDrawerComponent, {}) }));
        fireEvent.click(screen.getByText('Open Side Drawer Modal'));
        expect(screen.getByTestId('side-drawer')).toBeInTheDocument();
        expect(screen.getByTestId('side-drawer-content')).toBeInTheDocument();
    });
});
//# sourceMappingURL=ModalContext.test.js.map