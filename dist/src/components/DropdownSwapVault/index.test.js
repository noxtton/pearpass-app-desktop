import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { DropdownSwapVault } from './index';
import '@testing-library/jest-dom';
jest.mock('pearpass-lib-vault', () => ({
    useVault: () => ({
        refetch: jest.fn(),
        isVaultProtected: jest.fn()
    })
}));
jest.mock('../../context/LoadingContext', () => ({
    useLoadingContext: () => ({
        setIsLoading: jest.fn()
    })
}));
jest.mock('../../context/ModalContext', () => ({
    useModal: () => ({
        setModal: jest.fn()
    })
}));
describe('DropdownSwapVault component', () => {
    const mockVaults = [
        { id: 'vault2', name: 'vault2' },
        { id: 'vault3', name: 'vault3' }
    ];
    const mockSelectedVault = { id: 'vault1', name: 'vault1' };
    test('renders nothing when vaults array is empty', () => {
        const { container } = render(_jsx(ThemeProvider, { children: _jsx(DropdownSwapVault, { vaults: [], selectedVault: mockSelectedVault }) }));
        expect(container.firstChild).toBeNull();
        expect(container).toMatchSnapshot();
    });
    test('renders with selected vault', () => {
        const { getAllByText } = render(_jsx(ThemeProvider, { children: _jsx(DropdownSwapVault, { vaults: mockVaults, selectedVault: mockSelectedVault }) }));
        const elements = getAllByText('vault1');
        expect(elements).toHaveLength(1);
    });
    test('displays all vault options when open', () => {
        const { getByText, getAllByText } = render(_jsx(ThemeProvider, { children: _jsx(DropdownSwapVault, { vaults: mockVaults, selectedVault: mockSelectedVault }) }));
        fireEvent.click(getByText('vault1'));
        const vaultOptions = getAllByText(/vault[12]/);
        expect(vaultOptions).toHaveLength(2);
    });
});
//# sourceMappingURL=index.test.js.map