import { MS_PER_WEEK } from '../../constants/time'

/**
 * @param {{
 *  records: Array<{
 *      updatedAt: number
 *  }>
 *  index: number
 * }}
 * @returns {boolean}
 */
export const isNextRecordInLast14Days = (records, index) => {
  const now = Date.now()

  return (
    !!records?.[index + 1] &&
    now - records[index].updatedAt >= MS_PER_WEEK &&
    now - records[index + 1].updatedAt <= MS_PER_WEEK
  )
}
