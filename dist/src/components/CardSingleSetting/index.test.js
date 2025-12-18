import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { CardSingleSetting } from './index';
import '@testing-library/jest-dom';
jest.mock('./styles', () => ({
    Container: 'div',
    Content: 'div',
    Header: 'div',
    Title: 'h3'
}));
describe('CardSingleSetting', () => {
    it('renders with title', () => {
        const { container, getByText } = render(_jsx(CardSingleSetting, { title: "Test Title" }));
        expect(getByText('Test Title')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('renders children correctly', () => {
        const { getByText } = render(_jsx(CardSingleSetting, { title: "Test Title", children: _jsx("div", { children: "Child Content" }) }));
        expect(getByText('Child Content')).toBeInTheDocument();
    });
    it('renders with the correct structure', () => {
        const { container } = render(_jsx(CardSingleSetting, { title: "Test Title", children: _jsx("div", { children: "Child Content" }) }));
        const header = container.querySelector('div > div:first-child');
        const content = container.querySelector('div > div:nth-child(2)');
        expect(header).toBeInTheDocument();
        expect(content).toBeInTheDocument();
    });
});
//# sourceMappingURL=index.test.js.map