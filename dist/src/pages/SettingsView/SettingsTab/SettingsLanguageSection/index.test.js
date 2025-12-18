import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'pearpass-lib-ui-theme-provider';
import { SettingsLanguageSection } from './index';
import '@testing-library/jest-dom';
jest.mock('pearpass-lib-constants', () => ({
    LANGUAGES: [
        { name: 'English' },
        { name: 'Spanish' },
        { name: 'French' },
        { name: 'German' }
    ]
}));
describe('SettingsLanguageSection', () => {
    const renderWithProviders = (component) => render(_jsx(ThemeProvider, { children: component }));
    it('matches snapshot', () => {
        const { container } = renderWithProviders(_jsx(SettingsLanguageSection, {}));
        expect(container).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.js.map