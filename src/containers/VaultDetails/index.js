import { html } from 'htm/react'
import React from 'react'
import {
  FavoriteWrapper,
  Fields,
  Header,
  HeaderRight,
  Title
} from './styles.js'
import { CompoundField } from '../../../shared/components/CompoundField/index.js'
import { InputFIeld } from '../../../shared/components/InputField/index.js'
import { StarIcon } from '../../svgs/Icons/StarIcon.js'
import { colors } from 'pearpass-lib-ui-theme-provider'
import { useLingui } from '@lingui/react'
import { ButtonLittle } from '../../../shared/components/ButtonLittle/index.js'
import { BrushIcon } from '../../svgs/Icons/BrushIcon.js'
import { KebabMenuIcon } from '../../svgs/Icons/KebabMenuIcon.js'

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

        <${HeaderRight}>
          <${ButtonLittle} leftIcon=${BrushIcon}> ${i18n._('Edit')} <//>

          <${ButtonLittle} variant="secondary" leftIcon=${KebabMenuIcon} />
        <//>
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
