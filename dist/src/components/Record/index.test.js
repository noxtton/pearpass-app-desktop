import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { Record } from './index';
import '@testing-library/jest-dom/';
jest.mock('../../hooks/useRecordActionItems', () => ({
    useRecordActionItems: () => ({
        actions: [
            { label: 'Action 1', onClick: jest.fn() },
            { label: 'Action 2', onClick: jest.fn() }
        ]
    })
}));
jest.mock('../RecordActionsPopupContent', () => ({
    RecordActionsPopupContent: () => (_jsx("div", { "data-testid": "record-actions-popup-content", children: "RecordActionsPopupContent" }))
}));
jest.mock('../../lib-react-components', () => ({
    KebabMenuIcon: () => _jsx("svg", { "data-testid": "kebab-icon" })
}));
jest.mock('../RecordAvatar', () => ({
    RecordAvatar: () => _jsx("div", { children: "RecordAvatar" })
}));
describe('Record Component', () => {
    const dummyRecord = {
        id: '1',
        createdAt: 1630000000000,
        updatedAt: 1630000000000,
        isFavorite: false,
        vaultId: 'vault-1',
        folder: 'Test Folder',
        type: 'note',
        data: {
            title: 'Test Record Title',
            avatarSrc: ''
        }
    };
    test('renders Record component correctly when not selected', () => {
        const { asFragment } = render(_jsx(ThemeProvider, { children: _jsx(Record, { record: dummyRecord, isSelected: false, onClick: () => { }, onSelect: () => { } }) }));
        expect(asFragment()).toMatchSnapshot();
    });
    test('renders Record component correctly when selected', () => {
        const { asFragment } = render(_jsx(ThemeProvider, { children: _jsx(Record, { record: dummyRecord, isSelected: true, onClick: () => { }, onSelect: () => { } }) }));
        expect(asFragment()).toMatchSnapshot();
    });
    test('toggles action menu when kebab icon is clicked (snapshot test)', async () => {
        const { container, asFragment } = render(_jsx(ThemeProvider, { children: _jsx(Record, { record: dummyRecord, isSelected: false, onClick: () => { }, onSelect: () => { } }) }));
        expect(asFragment()).toMatchSnapshot('initial state');
        const kebabIcon = container.querySelector('[data-testid="kebab-icon"]');
        expect(kebabIcon).toBeInTheDocument();
        fireEvent.click(kebabIcon);
        await waitFor(() => {
            expect(container.querySelector('[data-testid="record-actions-popup-content"]')).toBeInTheDocument();
        });
        expect(asFragment()).toMatchSnapshot('after toggle');
    });
});
//# sourceMappingURL=index.test.js.map