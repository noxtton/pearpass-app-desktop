import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { ListItem } from './index';
import '@testing-library/jest-dom';
jest.mock('../../lib-react-components', () => ({
    BrushIcon: () => _jsx("svg", { "data-testid": "brush-icon" }),
    DeleteIcon: () => _jsx("svg", { "data-testid": "delete-icon" }),
    LockCircleIcon: () => _jsx("svg", { "data-testid": "lock-icon" }),
    ShareIcon: () => _jsx("svg", { "data-testid": "share-icon" })
}));
describe('Item Component', () => {
    const dummyItem = {
        name: 'vault-123',
        createdAt: 'Created 13/06/2025'
    };
    test('renders Item component correctly and matches snapshot', () => {
        const { asFragment } = render(_jsx(ThemeProvider, { children: _jsx(ListItem, { itemName: dummyItem.name, itemDateText: dummyItem.createdAt, onClick: () => { }, onShareClick: () => { }, onEditClick: () => { }, onDeleteClick: () => { } }) }));
        expect(asFragment()).toMatchSnapshot();
    });
    test('calls onClick when Item container is clicked', () => {
        const onClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ListItem, { itemName: dummyItem.name, itemDateText: dummyItem.createdAt, onClick: onClick, onShareClick: () => { }, onEditClick: () => { }, onDeleteClick: () => { } }) }));
        fireEvent.click(container.firstChild);
        expect(onClick).toHaveBeenCalled();
    });
    test('calls onShareClick when share icon is clicked', () => {
        const onShareClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ListItem, { itemName: dummyItem.name, itemDateText: dummyItem.createdAt, onClick: () => { }, onShareClick: onShareClick, onEditClick: () => { }, onDeleteClick: () => { } }) }));
        const shareIcon = container.querySelector('[data-testid="share-icon"]');
        expect(shareIcon).toBeInTheDocument();
        fireEvent.click(shareIcon.parentElement);
        expect(onShareClick).toHaveBeenCalled();
    });
    test('calls onEditClick when brush icon is clicked', () => {
        const onEditClick = jest.fn();
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(ListItem, { itemName: dummyItem.name, itemDateText: dummyItem.createdAt, onClick: () => { }, onShareClick: () => { }, onEditClick: onEditClick, onDeleteClick: () => { } }) }));
        const brushIcon = container.querySelector('[data-testid="brush-icon"]');
        expect(brushIcon).toBeInTheDocument();
        fireEvent.click(brushIcon.parentElement);
        expect(onEditClick).toHaveBeenCalled();
    });
    test('matches snapshot when action icons are clicked', () => {
        const { asFragment, container } = render(_jsx(ThemeProvider, { children: _jsx(ListItem, { itemName: dummyItem.name, itemDateText: dummyItem.createdAt, onClick: () => { }, onShareClick: () => { }, onEditClick: () => { }, onDeleteClick: () => { } }) }));
        expect(asFragment()).toMatchSnapshot('initial state');
        const shareIcon = container.querySelector('[data-testid="share-icon"]');
        const brushIcon = container.querySelector('[data-testid="brush-icon"]');
        const deleteIcon = container.querySelector('[data-testid="delete-icon"]');
        fireEvent.click(shareIcon.parentElement);
        fireEvent.click(brushIcon.parentElement);
        fireEvent.click(deleteIcon.parentElement);
        expect(asFragment()).toMatchSnapshot('after action icons clicked');
    });
});
//# sourceMappingURL=index.test.js.map