import React from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  StarIcon,
  BrushIcon,
  KebabMenuIcon,
  UserIcon,
  WorldIcon,
  CommonFileIcon,
  ButtonLittle,
  CompoundField,
  InputField,
  PasswordField
} from 'pearpass-lib-ui-react-components'
import { colors } from 'pearpass-lib-ui-theme-provider'

import {
  FavoriteWrapper,
  Fields,
  Header,
  HeaderRight,
  Title
} from './styles.js'

const MOCK_DATA = {
  title: 'Google',
  userName: 'caldarace',
  password: 'caldce',
  website: 'Google.com',
  websiteUrl: 'https://google.com',
  note: 'Last account'
}

export const RecordDetails = () => {
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
          <${ButtonLittle} startIcon=${BrushIcon}> ${i18n._('Edit')} <//>

          <${ButtonLittle} variant="secondary" startIcon=${KebabMenuIcon} />
        <//>
      <//>

      <${Fields}>
        <${CompoundField} isDisabled>
          <${InputField}
            label=${i18n._('Email or username')}
            value=${MOCK_DATA.userName}
            icon=${UserIcon}
            isDisabled
          />

          <${PasswordField} value=${MOCK_DATA.password} isDisabled />
        <//>

        <${CompoundField} isDisabled>
          <${InputField}
            label=${i18n._('Website')}
            value=${MOCK_DATA.website}
            icon=${WorldIcon}
            type="url"
            onClick=${handleWebsiteClick}
            isDisabled
          />
        <//>

        <${CompoundField} isDisabled>
          <${InputField}
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
