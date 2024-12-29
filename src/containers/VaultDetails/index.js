import { html } from 'htm/react'
import React from 'react'
import { FavoriteWrapper, Fields, Header, Title } from './styles.js'
import { CompoundField } from '../../../shared/components/CompoundField/index.js'
import { InputFIeld } from '../../../shared/components/InputField/index.js'
import { StarIcon } from '../../svgs/Icons/StarIcon.js'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useLingui } from '@lingui/react'

const MOCK_DATA = {
  title: 'Google'
}

export const VaultDetails = () => {
  const { i18n } = useLingui()

  return html`
    <${React.Fragment}>
      <${Header}>
        <div>
          <${Title}> ${MOCK_DATA.title} <//>
          <${FavoriteWrapper}>
            <${StarIcon} size="14" color=${colors.grey200.mode1} />
            ${i18n._('Favourites')}
          <//>
        </div>
      <//>

      <${Fields}>
        <${CompoundField}>
          <${InputFIeld}
            label="Email"
            placeholder="// email value"
            error="Email error"
          />
        <//>
      <//>
    <//>
  `
}
