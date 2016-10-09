export const REQUEST_ATTEND_BOOKING = 'REQUEST_ATTEND_BOOKING'
export const RECEIVE_ATTEND_BOOKING_ERROR = 'RECEIVE_ATTEND_BOOKING_ERROR'
export const RECEIVE_ATTEND_BOOKING_SUCCESS = 'RECEIVE_ATTEND_BOOKING_SUCCESS'

/**
 * Creates an action to request a booking be attended.
 *
 * @returns {{type: string}}
 */
export function requestAttendBooking() {
  return {
    type: REQUEST_ATTEND_BOOKING
  }
}

/**
 * Creates an error action to receive an attend booking error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveAttendBookingError(err) {
  return {
    type: RECEIVE_ATTEND_BOOKING_ERROR,
    error: err
  }
}

/**
 * Creates an success action to receive an attend booking success response.
 *
 * @param workshopId
 * @returns {{type: string, payload: *}}
 */
export function receiveAttendBookingSuccess(workshopId) {
  return {
    type: RECEIVE_ATTEND_BOOKING_SUCCESS,
    payload: workshopId
  }
}

/**
 * Marks a booking as attended.
 *
 * @param code
 * @param workshopId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function attendBooking(code, workshopId, callback) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()
    const params = {
      workshopId,
      studentId: user.id,
      attended: 1,
      userId: -1
    }

    dispatch(requestAttendBooking())
    UtsHelps.updateWorkshopBooking(params, (err, res) => {
      if (err) {
        dispatch(receiveAttendBookingError(err))
        callback(err)
      } else {
        dispatch(receiveAttendBookingSuccess(workshopId))
        callback(null, workshopId)
      }
    })
  }
}
