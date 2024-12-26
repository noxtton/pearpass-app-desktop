import { html } from 'htm/react'
import {
  sideBarContent,
  SidebarLogo,
  SidebarSettings,
  SidebarWrapper
} from './styles'
import { sideBarCategoriesContainer } from '../../components/SidebarCategoriesContainer'
import { PearPassTextLogo } from '../../svgs/PearPassLogo'
import { SidebarSearch } from '../../components/SidebarSearch'
import { SidebarNestedFolders } from '../../components/SidebarNestedFolders'
import { KeyIcon } from '../../svgs/Icons/keyIcon'
import { FullBodyIcon } from '../../svgs/Icons/FullBodyIcon'
import { CreditCardIcon } from '../../svgs/Icons/CreditCardIcon'
import { LockIcon } from '../../svgs/Icons/LockIcon'

const sampleData = {
  name: 'All Folders',
  children: [
    {
      name: 'Favorite',
      children: [
        { name: 'Google', icon: KeyIcon },
        { name: 'Personal identity', icon: FullBodyIcon }
      ]
    },
    {
      name: 'Games',
      children: [
        {
          name: 'Vacation',
          icon: CreditCardIcon,
          children: [
            { name: 'Vacation', icon: CreditCardIcon },
            { name: 'Family', icon: LockIcon }
          ]
        },
        { name: 'Family', icon: LockIcon }
      ]
    },
    {
      name: 'Trip',
      children: [
        { name: 'index', icon: CreditCardIcon },
        { name: 'styles', icon: FullBodyIcon }
      ]
    }
  ]
}

export const Sidebar = () => {
  return html`
    <${SidebarWrapper}>
      <${SidebarLogo}>
        <${PearPassTextLogo} />
      <//>

      <${sideBarContent}>
        <${sideBarCategoriesContainer} sidebarSize="default" />

        <${SidebarSearch} />

        <${SidebarNestedFolders} item=${sampleData} />
      <//>

      <${SidebarSettings}><//>
    <//>
  `
}
