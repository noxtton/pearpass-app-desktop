import React, { useState } from 'react'

import { html } from 'htm/react'

import { ContentWrapper, SearchContainer, Wrapper } from './styles'
import { ButtonPlusCreateNew } from '../../components/ButtonPlusCreateNew'
import { CreateNewCategoryPopupContent } from '../../components/CreateNewCategoryPopupContent'
import { InputSearch } from '../../components/InputSearch'
import { PopupMenu } from '../../components/PopupMenu'
import { useRouter } from '../../context/RouterContext'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'
import { useRecords } from '../../vault/hooks/useRecords'
import { EmptyCollectionView } from '../EmptyCollectionView'
import { RecordListView } from '../RecordListView/'

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRecords, setSelectedRecords] = useState([])
  const { popupItems } = useRecordMenuItems()
  const { data: routerData } = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [sortType, setSortType] = useState('recent')

  const sort = React.useMemo(() => {
    if (sortType === 'recent') {
      return {
        key: 'updatedAt',
        direction: 'desc'
      }
    }

    if (sortType === 'newToOld') {
      return {
        key: 'createdAt',
        direction: 'desc'
      }
    }

    if (sortType === 'oldToNew') {
      return {
        key: 'createdAt',
        direction: 'asc'
      }
    }

    return undefined
  })

  const { data: records } = useRecords({
    shouldSkip: true,
    variables: {
      filters: {
        searchPattern: searchValue,
        type:
          routerData?.recordType === 'all' ? undefined : routerData?.recordType
      },
      sort: sort
    }
  })

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

      ${!records?.length
        ? html` <${EmptyCollectionView} />`
        : html` <${ContentWrapper}>
            <${RecordListView}
              records=${records}
              selectedRecords=${selectedRecords}
              setSelectedRecords=${setSelectedRecords}
              sortType=${sortType}
              setSortType=${setSortType}
            />
          <//>`}
    <//>
  `
}
