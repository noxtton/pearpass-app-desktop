import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  KeyIcon,
  FullBodyIcon,
  CreditCardIcon,
  LockIcon,
  UserSecurityIcon,
  SettingsIcon,
  ButtonThin
} from 'pearpass-lib-ui-react-components'

import { SideBarCategories } from './SidebarCategories'
import { SidebarNestedFolders } from './SidebarNestedFolders'
import {
  FoldersWrapper,
  SettingsContainer,
  SettingsSeparator,
  sideBarContent,
  SidebarLogo,
  SidebarNestedFoldersContainer,
  SidebarSettings,
  SidebarWrapper
} from './styles'
import { SidebarSearch } from '../../components/SidebarSearch'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { LogoLock } from '../../svgs/LogoLock'
import { AddDeviceModalContent } from '../Modal/AddDeviceModalContent'

/**
 * @typedef SidebarProps
 * @property {'default' | 'tight'} [sidebarSize]
 */

/**
 * @param {SidebarProps} props
 */

export const Sidebar = ({ sidebarSize = 'tight' }) => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const handleSettingsClick = () => {
    navigate('settings', {})
  }

  const sampleData = {
    name: i18n._('All Folders'),
    id: 1,
    children: [
      {
        name: i18n._('Favorite'),
        id: 2,
        children: [
          { name: 'Google', icon: KeyIcon, id: 3 },
          { name: 'Personal identity', icon: FullBodyIcon, id: 4 }
        ]
      },
      {
        name: 'Games',
        id: 5,
        children: [
          {
            name: 'Vacation',
            icon: CreditCardIcon,
            id: 14,
            children: [
              {
                name: 'Vacation',
                id: 6,
                icon: CreditCardIcon,
                children: [
                  { name: 'Vacation', icon: CreditCardIcon, id: 7 },
                  { name: 'Family', icon: LockIcon, id: 8 }
                ]
              },
              { name: 'Family', icon: LockIcon, id: 9 }
            ]
          },
          { name: 'Family', icon: LockIcon, id: 10 }
        ]
      },
      {
        name: 'Trip',
        id: 11,
        children: [
          { name: 'index', icon: CreditCardIcon, id: 12 },
          { name: 'styles', icon: FullBodyIcon, id: 13 }
        ]
      }
    ]
  }

  const { setModal } = useModal()

  const handleAddDevice = () => {
    setModal(html`<${AddDeviceModalContent} />`)
  }

  return html`
    <${SidebarWrapper} size=${sidebarSize}>
      <${SidebarLogo}>
        <${LogoLock} width="19" height="26" />
        ${i18n._('PearPass')}
      <//>

      <${sideBarContent}>
        <${SideBarCategories} sidebarSize=${sidebarSize} />

        <${SidebarNestedFoldersContainer}>
          <${SidebarSearch} />

          <${FoldersWrapper}>
            <${SidebarNestedFolders} item=${sampleData} key="rootFolder" />
          <//>
        <//>
      <//>

      <${SidebarSettings}>
        <${SettingsContainer} onClick=${handleSettingsClick}>
          <${SettingsIcon} size="14" />
          ${i18n._('Settings')}
        <//>

        <${SettingsSeparator} />

        <${ButtonThin} leftIcon=${UserSecurityIcon} onClick=${handleAddDevice}>
          ${i18n._('Add Device')}
        <//>
      <//>
    <//>
  `
}
