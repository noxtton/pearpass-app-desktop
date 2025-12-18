import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { useVaults } from 'pearpass-lib-vault';
import { SettingsVaultsTab } from './index';
import { useModal } from '../../../context/ModalContext';
import '@testing-library/jest-dom';
jest.mock('@lingui/react', () => ({
    useLingui: () => ({
        i18n: {
            _: (str) => str
        }
    }),
    I18nProvider: ({ children }) => children
}));
jest.mock('pearpass-lib-vault', () => ({
    useVaults: jest.fn()
}));
jest.mock('../../../context/ModalContext', () => ({
    useModal: jest.fn()
}));
jest.mock('../../../utils/vaultCreated', () => ({
    vaultCreatedFormat: jest.fn((date) => date + 'date')
}));
jest.mock('../../../components/CardSingleSetting', () => ({
    CardSingleSetting: ({ title, children }) => (_jsxs("div", { children: [_jsx("h1", { children: title }), children] }))
}));
jest.mock('../../../components/ListItem', () => ({
    ListItem: ({ itemName, onEditClick }) => (_jsxs("div", { children: [_jsx("p", { children: itemName }), _jsx("button", { onClick: onEditClick, children: "Edit" })] }))
}));
describe('VaultsTab', () => {
    const setModalMock = jest.fn();
    const renderWithProviders = (component) => render(_jsx(ThemeProvider, { children: component }));
    beforeEach(() => {
        useVaults.mockReturnValue({
            data: [
                { id: '1', name: 'Vault 1' },
                { id: '2', name: 'Vault 2' }
            ]
        });
        useModal.mockReturnValue({
            setModal: setModalMock
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders Manage Vaults section', () => {
        const { container } = renderWithProviders(_jsx(SettingsVaultsTab, {}));
        expect(screen.getByText('Manage Vaults')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
    it('renders vaults in the list', () => {
        renderWithProviders(_jsx(SettingsVaultsTab, {}));
        expect(screen.getByText('Vault 1')).toBeInTheDocument();
        expect(screen.getByText('Vault 2')).toBeInTheDocument();
    });
    it('opens ModifyVaultModalContent when editing the first vault', () => {
        renderWithProviders(_jsx(SettingsVaultsTab, {}));
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[0]);
        expect(setModalMock).toHaveBeenCalledWith(expect.anything());
    });
    it('opens ModifyVaultModalContent when editing a specific vault', () => {
        renderWithProviders(_jsx(SettingsVaultsTab, {}));
        const editButtons = screen.getAllByText('Edit');
        fireEvent.click(editButtons[1]);
        expect(setModalMock).toHaveBeenCalledWith(expect.anything());
    });
});
//# sourceMappingURL=index.test.js.map