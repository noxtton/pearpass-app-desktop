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

/**
 * @param {{
 *  records: Array<{
 *    id: string,
 *    name: string,
 *    avatarSrc: string,
 *    updatedAt: number,
 *    isPinned: boolean
 *  }>,
 *    selectedRecords: Array<number>,
 *    selectedRecords: () => void
 * }} props
 */
export const RecordListView = ({
  records,
  selectedRecords,
  setSelectedRecords
}) => {
  const { i18n } = useLingui()
  const { currentPage, navigate } = useRouter()

  const sortActions = [
    { name: i18n._('Recent'), icon: TimeIcon, type: 'recent' },
    {
      name: i18n._('Newest to oldest'),
      icon: ArrowUpAndDown,
      type: 'newToOld'
    },
    { name: i18n._('Oldest to newest'), icon: ArrowUpAndDown, type: 'oldToNew' }
  ]

  const sortedRecords = records.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return b.updatedAt - a.updatedAt
    }
    return a.isPinned ? -1 : 1
  })

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false)
  const [sortType, setSortType] = useState('recent')
  const [isMultiSelect, setIsMultiSelect] = useState(false)

  const openRecordDetails = (record) => {
    navigate(currentPage, { recordId: record.id })
  }

  const handleRecordClick = (record, isSelected) => {
    if (isMultiSelect) {
      setSelectedRecords((prev) =>
        isSelected
          ? prev.filter((id) => id !== record.id)
          : [...prev, record.id]
      )

      return
    }

    openRecordDetails(record)
  }

  const handleSortTypeChange = (type) => {
    setSortType(type)
  }

  const isRecordsSelected = selectedRecords.length > 0

  const selectedSortAction = sortActions.find(
    (action) => action.type === sortType
  )

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
                  >${i18n._('Delete')}<//
                >`
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
        ${sortedRecords.map((record, index) => {
          const isSelected = selectedRecords.includes(record.id)

          const isStartOfLast7Days = isStartOfLast7DaysGroup(
            record,
            index,
            sortedRecords
          )

          const isStartOfLast14Days = isStartOfLast14DaysGroup(
            record,
            index,
            sortedRecords
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
                onClick=${() => handleRecordClick(record, isSelected)}
              />
            <//>
          `
        })}
      <//>
    <//>
  `
}
