import { useState } from 'react'

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
  PinnedRecordsSection,
  RecordsSection,
  RightActions,
  ViewWrapper
} from './styles'
import { PopupMenu } from '../../components/PopupMenu'
import { Record } from '../../components/Record'
import { RecordPin } from '../../components/RecordPin/index.'
import { RecordSortActionsPopupContent } from '../../components/RecordSortActionsPopupContent'
import { SEVEN_DAYS_IN_MILLISECONDS } from '../../constants/time'
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

  const sortedRecords = records.sort((a, b) => a.updatedAt - b.updatedAt)

  const now = Date.now()

  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false)
  const [sortType, setSortType] = useState('recent')
  const [isMultiSelect, setIsMultiSelect] = useState(false)

  const isNextRecordInLast14Days = (records, index) => {
    return (
      records[index + 1] &&
      now - records[index].updatedAt >= SEVEN_DAYS_IN_MILLISECONDS &&
      now - records[index + 1].updatedAt <= SEVEN_DAYS_IN_MILLISECONDS
    )
  }

  const openRecordDetails = (record) => {
    navigate(currentPage, { recordId: record.id })
  }

  const handleRecordClick = (record) => {
    if (isMultiSelect) {
      setSelectedRecords((prev) =>
        prev.includes(record.name)
          ? prev.filter((name) => name !== record.name)
          : [...prev, record.name]
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

  const pinnedRecords = records.filter((record) => record.isPinned)

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
      html`
        <${PinnedRecordsSection}>
          ${pinnedRecords.map(
            (record) =>
              html`<${RecordPin}
                name=${record.name}
                avatarSrc=${record.avatarSrc}
                onClick=${() => openRecordDetails(record)}
              />`
          )}
        <//>

        <${Folder}><${FolderIcon} /> Social media <//>
      `}

      <${RecordsSection}>
        <${DatePeriod}> ${i18n._('Last 7 days')} <//>
        ${sortedRecords.map(
          (record, index) =>
            html`<${Record}
                key=${record.name}
                record=${record}
                isSelected=${selectedRecords.includes(record.name)}
                onClick=${() => handleRecordClick(record)}
              />

              ${isNextRecordInLast14Days(sortedRecords, index) &&
              html` <${DatePeriod}> ${i18n._('Last 14 days')} <//> `} `
        )}
      <//>
    <//>
  `
}
