import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  UserSecurityIcon,
  SettingsIcon,
  ButtonThin,
  StarIcon
} from 'pearpass-lib-ui-react-components'
import { useFolders } from 'pearpass-lib-vault'

import { SideBarCategories } from './SidebarCategories'
import { SidebarNestedFolders } from './SidebarNestedFolders'
import {
  FoldersWrapper,
  LogoWrapper,
  SettingsContainer,
  SettingsSeparator,
  sideBarContent,
  SidebarNestedFoldersContainer,
  SidebarSettings,
  SidebarWrapper
} from './styles'
import { SidebarSearch } from '../../components/SidebarSearch'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'
import { useModal } from '../../context/ModalContext'
import { useRouter } from '../../context/RouterContext'
import { LogoLock } from '../../svgs/LogoLock'
import { AddDeviceModalContent } from '../Modal/AddDeviceModalContent'

/**
 * @param {{
 *    sidebarSize?: 'default' | 'tight'
 * }} props
 */
export const Sidebar = ({ sidebarSize = 'tight' }) => {
  const { i18n } = useLingui()
  const { navigate } = useRouter()

  const [searchValue, setSearchValue] = useState('')

  const { data, isLoading } = useFolders({
    variables: { searchPattern: searchValue }
  })

  const handleSettingsClick = () => {
    navigate('settings', {})
  }

  const openMainView = () => {
    navigate('vault', {
      recordType: 'all'
    })
  }

  const folders = React.useMemo(() => {
    const { favorites, noFolder, customFolders } = data || {}

    const otherFolders = Object.values(customFolders ?? {})

    return {
      name: i18n._('All Folders'),
      id: 'allFolders',
      children: [
        {
          name: i18n._('Favorite'),
          id: 'favorites',
          icon: StarIcon,
          children:
            favorites?.records?.map((record) => {
              return {
                name: record.data.title,
                id: record.id,
                icon: RECORD_ICON_BY_TYPE[record.type]
              }
            }) ?? []
        },
        ...otherFolders.map((folder) => {
          return {
            name: folder.name,
            id: folder.name,
            children: folder.records?.map((record) => {
              return {
                name: record.data?.title,
                id: record.id,
                icon: RECORD_ICON_BY_TYPE[record.type]
              }
            })
          }
        }),
        ...(noFolder?.records?.map((record) => {
          return {
            name: record.data.title,
            id: record.id,
            icon: RECORD_ICON_BY_TYPE[record.type]
          }
        }) ?? [])
      ]
    }
  }, [data, i18n])

  const { setModal } = useModal()

  const handleAddDevice = () => {
    setModal(html`<${AddDeviceModalContent} />`)
  }

  return html`
    <${SidebarWrapper} size=${sidebarSize}>
      <${LogoWrapper} onClick=${openMainView}>
        <${LogoLock} width="126" height="26" />
      <//>

      <${sideBarContent}>
        <${SideBarCategories} sidebarSize=${sidebarSize} />

        ${!isLoading &&
        html`
          <${SidebarNestedFoldersContainer}>
            <${SidebarSearch} value=${searchValue} onChange=${setSearchValue} />

            <${FoldersWrapper}>
              <${SidebarNestedFolders} item=${folders} key="rootFolder" />
            <//>
          <//>
        `}
      <//>

      <${SidebarSettings}>
        <${SettingsContainer} onClick=${handleSettingsClick}>
          <${SettingsIcon} size="14" />
          ${i18n._('Settings')}
        <//>

        <${SettingsSeparator} />

        <${ButtonThin} startIcon=${UserSecurityIcon} onClick=${handleAddDevice}>
          ${i18n._('Add Device')}
        <//>
      <//>
    <//>
  `
}
