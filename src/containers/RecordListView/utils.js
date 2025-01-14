import { SEVEN_DAYS_IN_MILLISECONDS } from '../../constants/time'

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
    now - records[index].updatedAt >= SEVEN_DAYS_IN_MILLISECONDS &&
    now - records[index + 1].updatedAt <= SEVEN_DAYS_IN_MILLISECONDS
  )
}
