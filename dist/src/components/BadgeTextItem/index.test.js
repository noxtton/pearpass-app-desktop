import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BadgeTextItem } from './index';
jest.mock('./styles', () => ({
    BadgeContainer: ({ children }) => (_jsx("div", { "data-testid": "badge-container", children: children })),
    BadgeText: ({ children, title }) => (_jsx("span", { "data-testid": "badge-text", title: title, children: children })),
    BadgeCount: ({ children }) => (_jsx("span", { "data-testid": "badge-count", children: children }))
}));
describe('BadgeTextItem', () => {
    test('renders word and count by default', () => {
        render(_jsx(BadgeTextItem, { count: 3, word: "alpha" }));
        expect(screen.getByTestId('badge-text')).toHaveTextContent('alpha');
        expect(screen.getByTestId('badge-count')).toHaveTextContent('#3');
    });
    test('hides count when isNumberVisible is false', () => {
        render(_jsx(BadgeTextItem, { count: 5, word: "beta", isNumberVisible: false }));
        expect(screen.getByTestId('badge-text')).toHaveTextContent('beta');
        expect(screen.queryByTestId('badge-count')).toBeNull();
    });
});
//# sourceMappingURL=index.test.js.map