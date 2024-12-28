import { html } from 'htm/react'
import { AppWrapper } from './styles.js'
import { LayoutWithSidebar } from '../LayoutWithSidebar'
import { CompoundField } from '../../../shared/components/CompoundField'
import { InputFIeld } from '../../../shared/components/InputField'

export const App = () => {
  return html`
    <${AppWrapper}>
      <${LayoutWithSidebar}>
        <${CompoundField}>
          <${InputFIeld} 
            label="Email" 
            value="// email value"
          />
        <//>
      <//>
    </${AppWrapper}>
  `
}

//  ${currentPage === 'welcome' && html` <${InitialWelcomePage} /> `}
//  ${currentPage === 'loading' && html` <${InitialLoadPage} /> `}
