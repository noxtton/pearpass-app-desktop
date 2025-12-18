import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SettingsBlindPeersSection } from './index';
jest.mock('../../../../hooks/useTranslation', () => ({
    useTranslation: () => ({
        t: (str) => str
    })
}));
jest.mock('../../../../context/LoadingContext', () => ({
    useLoadingContext: () => ({
        setIsLoading: jest.fn()
    })
}));
const mockSetModal = jest.fn();
const mockCloseModal = jest.fn();
jest.mock('../../../../context/ModalContext', () => ({
    useModal: () => ({
        setModal: mockSetModal,
        closeModal: mockCloseModal
    })
}));
jest.mock('../../../../context/ToastContext', () => ({
    useToast: () => ({
        setToast: jest.fn()
    })
}));
const mockRemoveAllBlindMirrors = jest.fn();
const mockGetBlindMirrors = jest.fn();
const mockAddBlindMirrors = jest.fn();
const mockAddDefaultBlindMirrors = jest.fn();
jest.mock('pearpass-lib-vault', () => {
    const stableData = [];
    return {
        useBlindMirrors: () => ({
            removeAllBlindMirrors: mockRemoveAllBlindMirrors,
            data: stableData,
            getBlindMirrors: mockGetBlindMirrors,
            addBlindMirrors: mockAddBlindMirrors,
            addDefaultBlindMirrors: mockAddDefaultBlindMirrors
        })
    };
});
jest.mock('pearpass-lib-constants', () => ({
    BLIND_PEER_TYPE: {
        PERSONAL: 'personal',
        DEFAULT: 'default'
    }
}));
jest.mock('pearpass-lib-ui-theme-provider', () => ({
    ThemeProvider: ({ children }) => _jsx("div", { children: children }),
    colors: {
        primary400: {
            mode1: '#007AFF'
        }
    }
}));
jest.mock('./styles', () => ({
    LearnMoreLink: ({ children, href }) => _jsx("a", { href: href, children: children }),
    ListContainer: ({ children }) => _jsx("ul", { children: children }),
    TooltipContent: ({ children }) => _jsx("div", { children: children }),
    TooltipText: ({ children }) => _jsx("div", { children: children }),
    Wrapper: ({ children }) => _jsx("div", { children: children })
}));
jest.mock('../../../../components/CardSingleSetting', () => ({
    CardSingleSetting: ({ children, title, additionalHeaderContent }) => (_jsxs("div", { "data-testid": "card-single-setting", children: [_jsx("div", { "data-testid": "card-title", children: title }), additionalHeaderContent && (_jsx("div", { "data-testid": "additional-header", children: additionalHeaderContent })), _jsx("div", { "data-testid": "card-content", children: children })] }))
}));
jest.mock('../../../../components/PopupMenu', () => ({
    PopupMenu: ({ children }) => _jsx("div", { "data-testid": "popup-menu", children: children })
}));
jest.mock('../../../../containers/Modal/BlindPeersModalContent', () => ({
    BlindPeersModalContent: () => _jsx("div", { "data-testid": "blind-peers-modal" })
}));
jest.mock('../../../../containers/Modal/GeneratePasswordSideDrawerContent/RuleSelector', () => ({
    RuleSelector: ({ rules, selectedRules, setRules }) => (_jsx("div", { "data-testid": "rule-selector", children: rules.map((rule) => (_jsxs("div", { "data-testid": `rule-${rule.name}`, children: [_jsx("span", { "data-testid": `rule-label-${rule.name}`, children: rule.label }), _jsx("span", { "data-testid": `rule-description-${rule.name}`, children: rule.description }), _jsx("button", { "data-testid": `toggle-${rule.name}`, onClick: () => setRules({ [rule.name]: !selectedRules[rule.name] }), children: selectedRules[rule.name] ? 'Disable' : 'Enable' })] }, rule.name))) }))
}));
jest.mock('../../../../lib-react-components', () => ({
    InfoIcon: () => _jsx("div", { "data-testid": "info-icon", children: "Info" })
}));
jest.mock('../../../../lib-react-components/components/TooltipWrapper', () => ({
    TooltipWrapper: ({ children }) => (_jsx("div", { "data-testid": "tooltip-wrapper", children: children }))
}));
jest.mock('../../../../lib-react-components/icons/OutsideLinkIcon', () => ({
    OutsideLinkIcon: () => _jsx("div", { "data-testid": "outside-link-icon", children: "Link" })
}));
describe('SettingsBlindPeersSection', () => {
    const renderWithProviders = (component) => render(_jsx(ThemeProvider, { children: component }));
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('matches snapshot', () => {
        const { container } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        expect(container).toMatchSnapshot();
    });
    it('renders the component with correct title', () => {
        const { getByTestId } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        expect(getByTestId('card-title')).toHaveTextContent('Blind Peering');
    });
    it('calls getBlindMirrors on component mount', () => {
        renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        expect(mockGetBlindMirrors).toHaveBeenCalledTimes(1);
    });
    it('renders rule selector with correct props', () => {
        const { getByTestId } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        const ruleSelector = getByTestId('rule-selector');
        expect(ruleSelector).toBeInTheDocument();
        const blindPeersRule = getByTestId('rule-blindPeers');
        expect(blindPeersRule).toBeInTheDocument();
        const ruleLabel = getByTestId('rule-label-blindPeers');
        expect(ruleLabel).toHaveTextContent('Private Connections');
        const ruleDescription = getByTestId('rule-description-blindPeers');
        expect(ruleDescription).toHaveTextContent('Sync your encrypted vault securely with blind peers');
    });
    it('renders learn more link', () => {
        const { getByText } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        expect(getByText('Learn more about blind peering.')).toBeInTheDocument();
    });
    it('opens modal when enabling blind peers', () => {
        const { getByTestId } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        const toggleButton = getByTestId('toggle-blindPeers');
        expect(toggleButton).toHaveTextContent('Enable');
        fireEvent.click(toggleButton);
        expect(mockSetModal).toHaveBeenCalledTimes(1);
    });
    it('displays correct initial state with disabled blind peers', () => {
        const { getByTestId } = renderWithProviders(_jsx(SettingsBlindPeersSection, {}));
        const toggleButton = getByTestId('toggle-blindPeers');
        expect(toggleButton).toHaveTextContent('Enable');
    });
});
//# sourceMappingURL=index.test.js.map