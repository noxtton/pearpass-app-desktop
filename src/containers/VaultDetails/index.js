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
import { UserIcon } from '../../svgs/Icons/UserIcon.js'
import { PasswordField } from '../../../shared/components/PasswordField/index.js'
import { WorldIcon } from '../../svgs/Icons/WorldIcon.js'
import { CommonFileIcon } from '../../svgs/Icons/CommonFileIcon.js'

const MOCK_DATA = {
  title: 'Google',
  userName: 'caldarace',
  password: 'caldce',
  website: 'Google.com',
  websiteUrl: 'https://google.com',
  note: 'Last account'
}

export const VaultDetails = () => {
  const { i18n } = useLingui()

  const handleWebsiteClick = () => {
    window.open(MOCK_DATA.websiteUrl, '_blank')
  }

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
        <${CompoundField} isDisabled>
          <${InputFIeld}
            label=${i18n._('Email or username')}
            value=${MOCK_DATA.userName}
            icon=${UserIcon}
            isDisabled
          />

          <${PasswordField} value=${MOCK_DATA.password} isDisabled />
        <//>

        <${CompoundField} isDisabled>
          <${InputFIeld}
            label=${i18n._('Website')}
            value=${MOCK_DATA.website}
            icon=${WorldIcon}
            type="url"
            onClick=${handleWebsiteClick}
            isDisabled
          />
        <//>

        <${CompoundField} isDisabled>
          <${InputFIeld}
            label=${i18n._('Website')}
            value=${MOCK_DATA.note}
            icon=${CommonFileIcon}
            isDisabled
          />
        <//>
      <//>
    <//>
  `
}
