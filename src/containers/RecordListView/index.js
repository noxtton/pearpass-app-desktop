import React, { useState } from 'react'

import { useLingui } from '@lingui/react'
import { html } from 'htm/react'
import {
  ArrowUpAndDown,
  ButtonFilter,
  DeleteIcon,
  FolderIcon,
  MoveToIcon,
  MultiSelection,
  TimeIcon,
  XIcon
} from 'pearpass-lib-ui-react-components'

import {
  ActionsSection,
  DatePeriod,
  Folder,
  LeftActions,
  RecordsSection,
  RightActions,
  ViewWrapper
} from './styles'
import { isStartOfLast14DaysGroup, isStartOfLast7DaysGroup } from './utils'
import { PopupMenu } from '../../components/PopupMenu'
import { Record } from '../../components/Record'
import { RecordSortActionsPopupContent } from '../../components/RecordSortActionsPopupContent'
import { useRouter } from '../../context/RouterContext'
import { useDeleteRecord } from '../../vault/hooks/useDeleteRecord'

/**
 * @param {{
 *  records: Array<{
 *    id: string
 *    createdAt: number
 *    updatedAt: number
 *    isPinned: boolean
 *    isFavorite: boolean
 *    vaultId: string
 *    folder: string
 *    data: {
 *      title: string
 *      [key: string]: any
 *    }
 *  }>,
 *  selectedRecords: Array<number>,
 *  setSelectedRecords: () => void
 * }} props
 */
export const RecordListView = ({
  records,
  selectedRecords,
  setSelectedRecords,
  sortType,
  setSortType
}) => {
  const { i18n } = useLingui()
  const { currentPage, navigate, data } = useRouter()

  const { deleteRecord } = useDeleteRecord()

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false)
  const [isMultiSelect, setIsMultiSelect] = useState(false)

  const sortActions = [
    { name: i18n._('Recent'), icon: TimeIcon, type: 'recent' },
    {
      name: i18n._('Newest to oldest'),
      icon: ArrowUpAndDown,
      type: 'newToOld'
    },
    { name: i18n._('Oldest to newest'), icon: ArrowUpAndDown, type: 'oldToNew' }
  ]

  const isRecordsSelected = selectedRecords.length > 0

  const selectedSortAction = sortActions.find(
    (action) => action.type === sortType
  )

  const openRecordDetails = (record) => {
    navigate(currentPage, { recordId: record.id, recordType: data.recordType })
  }

  const handleSelect = (record, isSelected) => {
    setIsMultiSelect(true)

    setSelectedRecords((prev) =>
      isSelected ? prev.filter((id) => id !== record.id) : [...prev, record.id]
    )
  }

  const handleRecordClick = (record, isSelected) => {
    if (isMultiSelect) {
      handleSelect(record, isSelected)
      return
    }

    openRecordDetails(record)
  }

  const handleSortTypeChange = (type) => {
    setSortType(type)
  }

  const handleDelete = async () => {
    await Promise.all(selectedRecords.map((id) => deleteRecord(id)))

    setSelectedRecords([])
  }

  return html`
    <${ViewWrapper}>
      <${ActionsSection}>
        <${LeftActions}>
          ${isMultiSelect
            ? html`<${ButtonFilter}
                  isDisabled=${!isRecordsSelected}
                  startIcon=${MoveToIcon}
                >
                  ${i18n._('Move')}
                <//>

                <${ButtonFilter}
                  isDisabled=${!isRecordsSelected}
                  startIcon=${DeleteIcon}
                  onClick=${handleDelete}
                >
                  ${i18n._('Delete')}
                <//> `
            : html`<${PopupMenu}
                side="left"
                align="left"
                isOpen=${isSortPopupOpen}
                setIsOpen=${setIsSortPopupOpen}
                content=${html` <${RecordSortActionsPopupContent}
                  onClick=${handleSortTypeChange}
                  onClose=${() => setIsSortPopupOpen(false)}
                  selectedType=${sortType}
                  menuItems=${sortActions}
                />`}
              >
                <${ButtonFilter} startIcon=${selectedSortAction.icon}>
                  ${selectedSortAction.name}
                <//>
              <//> `}
        <//>

        <${RightActions}>
          ${isMultiSelect
            ? html`<${ButtonFilter}
                onClick=${() => {
                  setSelectedRecords([])
                  setIsMultiSelect(false)
                }}
                startIcon=${XIcon}
              >
                ${i18n._('Cancel')}
              <//>`
            : html`<${ButtonFilter}
                onClick=${() => setIsMultiSelect(true)}
                startIcon=${MultiSelection}
              >
                ${i18n._('Multiple selection')}
              <//> `}
        <//>
      <//>

      ${!isMultiSelect &&
      html` <${Folder}><${FolderIcon} /> Social media <//> `}

      <${RecordsSection}>
        ${records.map((record, index) => {
          if (!record.data) {
            return html``
          }

          const isSelected = selectedRecords.includes(record.id)

          const isStartOfLast7Days = isStartOfLast7DaysGroup(
            record,
            index,
            records
          )

          const isStartOfLast14Days = isStartOfLast14DaysGroup(
            record,
            index,
            records
          )

          return html`
            <${React.Fragment} key=${record.id}>
              ${isStartOfLast7Days &&
              html`<${DatePeriod}> ${i18n._('Last 7 days')} <//>`}
              ${isStartOfLast14Days &&
              html`<${DatePeriod}> ${i18n._('Last 14 days')} <//>`}

              <${Record}
                record=${record}
                isSelected=${isSelected}
                onSelect=${() => handleSelect(record, isSelected)}
                onClick=${() => handleRecordClick(record, isSelected)}
              />
            <//>
          `
        })}
      <//>
    <//>
  `
}
