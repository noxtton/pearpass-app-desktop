import React, { useState } from 'react'

import { html } from 'htm/react'
import { useRecords } from 'pearpass-lib-vault-desktop'

import { ContentWrapper, SearchContainer, Wrapper } from './styles'
import { ButtonPlusCreateNew } from '../../components/ButtonPlusCreateNew'
import { CreateNewCategoryPopupContent } from '../../components/CreateNewCategoryPopupContent'
import { InputSearch } from '../../components/InputSearch'
import { PopupMenu } from '../../components/PopupMenu'
import { useRouter } from '../../context/RouterContext'
import { useCreateOrEditRecord } from '../../hooks/useCreateOrEditRecord'
import { useRecordMenuItems } from '../../hooks/useRecordMenuItems'
import { isFavorite } from '../../utils/isFavorite'
import { EmptyCollectionView } from '../EmptyCollectionView'
import { RecordListView } from '../RecordListView'

const SORT_BY_TYPE = {
  recent: {
    key: 'updatedAt',
    direction: 'desc'
  },
  newToOld: {
    key: 'createdAt',
    direction: 'desc'
  },
  oldToNew: {
    key: 'createdAt',
    direction: 'asc'
  }
}

export const MainView = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRecords, setSelectedRecords] = useState([])
  const { popupItems } = useRecordMenuItems()
  const { data: routerData } = useRouter()

  const [searchValue, setSearchValue] = useState('')
  const [sortType, setSortType] = useState('recent')

  const sort = React.useMemo(() => {
    return SORT_BY_TYPE[sortType]
  }, [sortType])

  const { data: records } = useRecords({
    shouldSkip: true,
    variables: {
      filters: {
        searchPattern: searchValue,
        type:
          routerData?.recordType === 'all' ? undefined : routerData?.recordType,
        folder:
          routerData?.folder && !isFavorite(routerData.folder)
            ? routerData.folder
            : undefined,
        isFavorite: routerData?.folder
          ? isFavorite(routerData.folder)
          : undefined
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
          quantity=${records?.length}
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
