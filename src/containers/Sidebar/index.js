import React, { useMemo, useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import { matchPatternToValue } from 'pear-apps-utils-pattern-search'
import {
  ButtonThin,
  ExitIcon,
  SettingsIcon,
  StarIcon,
  UserSecurityIcon
} from 'pearpass-lib-ui-react-components'
import {
  closeAllInstances,
  useFolders,
  useVault,
  useVaults
} from 'pearpass-lib-vault'

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
import { DropdownSwapVault } from '../../components/DropdownSwapVault'
import { SidebarSearch } from '../../components/SidebarSearch'
import { RECORD_ICON_BY_TYPE } from '../../constants/recordIconByType'
import { useLoadingContext } from '../../context/LoadingContext'
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
  const { navigate, data: routerData } = useRouter()

  const [searchValue, setSearchValue] = useState('')

  const { setIsLoading } = useLoadingContext()

  const { data, isLoading } = useFolders({
    variables: { searchPattern: searchValue }
  })

  const { data: vaultsData, resetState } = useVaults()

  const { data: vaultData } = useVault({ shouldSkip: true })

  const vaults = useMemo(() => {
    return vaultsData?.filter((vault) => vault.id !== vaultData?.id)
  }, [vaultsData, vaultData])

  const handleSettingsClick = () => {
    navigate('settings', {})
  }

  const openMainView = () => {
    navigate('vault', { recordType: 'all' })
  }

  const handleExitVault = async () => {
    setIsLoading(true)
    await closeAllInstances()
    navigate('welcome', { state: 'masterPassword' })
    resetState()
    setIsLoading(false)
  }

  const matchesSearch = (records, searchValue) => {
    if (!searchValue) {
      return false
    }

    return records.some((record) => {
      return matchPatternToValue(searchValue, record?.data?.title ?? '')
    })
  }

  const folders = React.useMemo(() => {
    const { favorites, noFolder, customFolders } = data || {}

    const otherFolders = Object.values(customFolders ?? {})

    return [
      {
        name: i18n._('Favorite'),
        id: 'favorites',
        icon: StarIcon,
        children:
          favorites?.records?.map((record) => {
            return {
              name: record?.data.title,
              id: record?.id,
              icon: RECORD_ICON_BY_TYPE[record?.type]
            }
          }) ?? []
      },
      {
        name: i18n._('All Folders'),
        id: 'allFolders',
        children: [
          ...otherFolders.map((folder) => {
            return {
              name: folder.name,
              id: folder.name,
              isActive: routerData?.folder === folder.name,
              isOpenInitially: matchesSearch(folder.records ?? [], searchValue),
              children: folder.records?.map((record) => {
                return {
                  name: record?.data?.title,
                  id: record?.id,
                  icon: RECORD_ICON_BY_TYPE[record?.type]
                }
              })
            }
          }),
          ...(noFolder?.records?.map((record) => {
            return {
              name: record?.data.title,
              id: record?.id,
              icon: RECORD_ICON_BY_TYPE[record?.type]
            }
          }) ?? [])
        ]
      }
    ]
  }, [data, i18n, routerData])

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
        <${DropdownSwapVault} vaults=${vaults} selectedVault=${vaultData} />

        <${SideBarCategories} sidebarSize=${sidebarSize} />

        ${!isLoading &&
        html`
          <${SidebarNestedFoldersContainer}>
            <${SidebarSearch} value=${searchValue} onChange=${setSearchValue} />

            <${FoldersWrapper}>
              ${folders.map(
                (folder) =>
                  html`<${SidebarNestedFolders}
                    item=${folder}
                    key="rootFolder"
                  />`
              )}
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

        <${ButtonThin} startIcon=${ExitIcon} onClick=${handleExitVault}>
          ${i18n._('Exit Vault')}
        <//>
      <//>
    <//>
  `
}
