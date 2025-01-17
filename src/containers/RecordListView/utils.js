import { MS_PER_WEEK } from '../../constants/time'

/**
 * @param {{
 *  record: {
 *      updatedAt: number
 *  }
 * }}
 * @returns {boolean}
 */
export const isRecordInLast7Days = (record) => {
  const now = Date.now()
  const sevenDaysAgo = now - MS_PER_WEEK

  return record.updatedAt >= sevenDaysAgo
}

/**
 * @param {{
 *  record: {
 *      updatedAt: number
 *  }
 * }}
 * @returns {boolean}
 */
export const isRecordInLast14Days = (record) => {
  const now = Date.now()
  const fourteenDaysAgo = now - MS_PER_WEEK * 2
  const sevenDaysAgo = now - MS_PER_WEEK

  return record.updatedAt >= fourteenDaysAgo && record.updatedAt < sevenDaysAgo
}

/**
 * @param {{
 *  record: {
 *   isPinned: boolean,
 *   updatedAt: number
 *  },
 *  index: number,
 *  sortedRecords: Array<{
 *    isPinned: boolean,
 *    updatedAt: number
 *  }>
 * }}
 * @returns {boolean}
 */
export const isStartOfLast7DaysGroup = (record, index, sortedRecords) => {
  const prevRecord = sortedRecords[index - 1]
  const prevIsPinned = prevRecord?.isPinned

  const isInLast7Days = isRecordInLast7Days(record)

  return !record.isPinned && isInLast7Days && (index === 0 || prevIsPinned)
}

/**
 * @param {{
 *  record: {
 *      updatedAt: number
 *  },
 *   index: number,
 *   sortedRecords: Array<{
 *    isPinned: boolean
 *    updatedAt: number
 *  }>
 * }}
 * @returns {boolean}
 */
export const isStartOfLast14DaysGroup = (record, index, sortedRecords) => {
  const prevRecord = sortedRecords[index - 1]
  const prevIsPinned = prevRecord?.isPinned
  const prevIsInLast7Days = prevRecord && isRecordInLast7Days(prevRecord)

  const isInLast14Days = isRecordInLast14Days(record)

  return (
    !record.isPinned &&
    isInLast14Days &&
    (index === 0 || prevIsPinned || prevIsInLast7Days)
  )
}
