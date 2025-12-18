import { jsx as _jsx } from "react/jsx-runtime";
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
// import htm from 'htm' // Removed for TypeScript conversion
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { setPearpassVaultClient, VaultProvider } from 'pearpass-lib-vault';
import { createRoot } from 'react-dom/client';
import { App } from './src/app/App';
import { LoadingProvider } from './src/context/LoadingContext';
import { ModalProvider } from './src/context/ModalContext';
import { RouterProvider } from './src/context/RouterContext';
import { ToastProvider } from './src/context/ToastContext';
import { messages } from './src/locales/en/messages.mjs';
import { createOrGetPearpassClient } from './src/services/createOrGetPearpassClient';
import { createOrGetPipe } from './src/services/createOrGetPipe';
import { startNativeMessagingIPC } from './src/services/nativeMessagingIPCServer';
import { logger } from './src/utils/logger';
import { setFontsAndResetCSS } from './styles';
const storage = Pear.config.storage;
// Set fonts and reset CSS
setFontsAndResetCSS();
// Initialize i18n
i18n.load('en', messages);
i18n.activate('en');
// Initialize the vault client
const pipe = createOrGetPipe();
// const isProduction =
//   (typeof Pear !== 'undefined' && !!Pear.config?.key) ||
//   (typeof process !== 'undefined' &&
//     process.env &&
//     process.env.NODE_ENV === 'production')
const client = createOrGetPearpassClient(pipe, storage, {
    debugMode: false
});
setPearpassVaultClient(client);
// Check if native messaging is enabled and start IPC server
// For testing, always start the IPC server
startNativeMessagingIPC(client).catch((err) => {
    logger.error('INDEX', 'Failed to start IPC server:', err);
});
let inactivityTimeout;
const resetInactivityTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
        window.dispatchEvent(new Event('user-inactive'));
    }, 60 * 1000);
};
const activityEvents = [
    'mousemove',
    'mousedown',
    'keydown',
    'touchstart',
    'scroll'
];
activityEvents.forEach((event) => window.addEventListener(event, resetInactivityTimer));
resetInactivityTimer();
// Render the application
const container = document.querySelector('#root');
if (!container)
    throw new Error('Failed to find the root element');
const root = createRoot(container);
// const html = htm.bind(createElement) // Removed htm binding
root.render(_jsx(LoadingProvider, { children: _jsx(ThemeProvider, { children: _jsx(VaultProvider, { children: _jsx(I18nProvider, { i18n: i18n, children: _jsx(ToastProvider, { children: _jsx(RouterProvider, { children: _jsx(ModalProvider, { children: _jsx(App, {}) }) }) }) }) }) }) }));
//# sourceMappingURL=app.js.map