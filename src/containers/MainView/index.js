import { useState } from 'react'

import { html } from 'htm/react'

import { ContentWrapper, SearchContainer, Wrapper } from './styles'
import { ButtonPlusCreateNew } from '../../components/ButtonPlusCreateNew'
import { CreateNewCategoryPopupContent } from '../../components/CreateNewCategoryPopupContent'
import { InputSearch } from '../../components/InputSearch'
import { PopupMenu } from '../../components/PopupMenu'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'
import { EmptyCollectionView } from '../EmptyCollectionView'
import { RecordListView } from '../RecordListView/'

const RECORD_LIST_MOCK_DATA = [
  {
    id: '1',
    name: 'Google',
    avatarSrc: '',
    updatedAt: 1736194461000,
    isPinned: true
  },
  {
    id: '2',
    name: 'Instagram',
    avatarSrc: '',
    updatedAt: 1735883961000,
    isPinned: false
  },
  {
    id: '3',
    name: 'Steam',
    avatarSrc: '',
    updatedAt: 1735181200000,
    isPinned: true
  },
  {
    id: '4',
    name: 'Epic Games',
    avatarSrc: '',
    updatedAt: 1735618705000,
    isPinned: false
  },
  {
    id: '5',
    name: 'Facebook',
    avatarSrc: '',
    updatedAt: 1735326642000,
    isPinned: false
  },
  {
    id: '6',
    name: 'Twitter',
    avatarSrc: '',
    updatedAt: 1734361804000,
    isPinned: false
  },
  {
    id: '7',
    name: 'Spotify',
    avatarSrc: '',
    updatedAt: 1736287800000,
    isPinned: false
  },
  {
    id: '8',
    name: 'Amazon',
    avatarSrc: '',
    updatedAt: 1735360201000,
    isPinned: false
  },
  {
    id: '9',
    name: 'Apple',
    avatarSrc: '',
    updatedAt: 1734869123000,
    isPinned: true
  },
  {
    id: '10',
    name: 'Microsoft',
    avatarSrc: '',
    updatedAt: 1734423245000,
    isPinned: false
  }
]

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRecords, setSelectedRecords] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const { popupItems } = useRecordMenuItems()

  const { handleCreateOrEditRecord } = useCreateOrEditRecord()

  const handleMenuItemClick = (item) => {
    handleCreateOrEditRecord({ recordType: item.type })
    setIsOpen(false)
  }

  return html`
    <${Wrapper}>
      <${SearchContainer}>
        <${InputSearch}
          value=${searchValue}
          onChange=${(e) => setSearchValue(e.target.value)}
        />

        <${PopupMenu}
          side="right"
          align="right"
          isOpen=${isOpen}
          setIsOpen=${setIsOpen}
          content=${html`
            <${CreateNewCategoryPopupContent}
              menuItems=${popupItems}
              onClick=${handleMenuItemClick}
            />
          `}
        >
          <${ButtonPlusCreateNew} isOpen=${isOpen} />
        <//>
      <//>

      ${searchValue?.length
        ? html` <${EmptyCollectionView} />`
        : html` <${ContentWrapper}>
            <${RecordListView}
              records=${RECORD_LIST_MOCK_DATA}
              selectedRecords=${selectedRecords}
              setSelectedRecords=${setSelectedRecords}
            />
          <//>`}
    <//>
  `
}
