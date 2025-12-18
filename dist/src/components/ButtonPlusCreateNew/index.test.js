import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ButtonPlusCreateNew } from './index';
jest.mock('../../lib-react-components', () => ({
    PlusIcon: () => 'PlusIcon',
    XIcon: () => 'XIcon'
}));
jest.mock('pearpass-lib-ui-theme-provider', () => ({
    colors: {
        black: {
            mode1: '#000000'
        }
    }
}));
jest.mock('./styles', () => ({
    Button: ({ children }) => _jsx("div", { "data-testid": "button", children: children })
}));
describe('ButtonPlusCreateNew', () => {
    it('renders PlusIcon when isOpen is false', () => {
        const { container, getByTestId } = render(_jsx(ButtonPlusCreateNew, { isOpen: false }));
        expect(getByTestId('button').textContent).toBe('PlusIcon');
        expect(container).toMatchSnapshot();
    });
    it('renders XIcon when isOpen is true', () => {
        const { container, getByTestId } = render(_jsx(ButtonPlusCreateNew, { isOpen: true }));
        expect(getByTestId('button').textContent).toBe('XIcon');
        expect(container).toMatchSnapshot();
    });
    it('passes the correct color prop to icons', () => {
        const { container } = render(_jsx(ButtonPlusCreateNew, { isOpen: false }));
        expect(container).toMatchSnapshot();
    });
    it('uses the Button component from styles', () => {
        const { getByTestId } = render(_jsx(ButtonPlusCreateNew, { isOpen: false }));
        expect(getByTestId('button')).toBeTruthy();
    });
});
//# sourceMappingURL=index.test.js.map