import moment from 'moment'

/**
 * Constructs a date string for display.
 *
 * @param startDate
 * @dateFormat
 * @private
 */
export function getDateString(startDate, dateFormat = 'dddd, Do MMMM YYYY') {
  return moment(startDate).format(dateFormat)
}

/**
 * Constructs a time string for display.
 *
 * @param startDate
 * @param endDate
 * @param timeFormat
 * @param timeStringFormat
 * @returns {string}
 * @private
 */
export function getTimeString(startDate, endDate, timeFormat = 'h:mma', timeStringFormat = '{0} - {1}') {
  const start = moment(startDate).format(timeFormat)
  const end = moment(endDate).format(timeFormat)
  return timeStringFormat.replace('{0}', start).replace('{1}', end)
}
