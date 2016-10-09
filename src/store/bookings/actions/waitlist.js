export const REQUEST_WAITLIST_BOOKING = 'REQUEST_WAITLIST_BOOKING'
export const RECEIVE_WAITLIST_BOOKING_ERROR = 'RECEIVE_WAITLIST_BOOKING_ERROR'
export const RECEIVE_WAITLIST_BOOKING_SUCCESS = 'RECEIVE_WAITLIST_BOOKING_SUCCESS'

/**
 * Creates an action to request to join the waitlist for a workshop.
 *
 * @returns {{type: string}}
 */
export function requestWaitlistBooking() {
  return {
    type: REQUEST_WAITLIST_BOOKING
  }
}

/**
 * Creates an error action to receive an waitlist error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveWaitlistBookingError(err) {
  return {
    type: RECEIVE_WAITLIST_BOOKING_ERROR,
    error: err
  }
}

/**
 * Creates an success action to receive an waitlist success response.
 *
 * @param workshopId
 * @returns {{type: string, payload: *}}
 */
export function receiveWaitlistBookingSuccess(workshopId) {
  return {
    type: RECEIVE_WAITLIST_BOOKING_SUCCESS,
    payload: workshopId
  }
}

/**
 * Creates a waitlist booking.
 *
 * @param workshopId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function createWaitlistBooking(workshopId, callback) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()

    dispatch(requestWaitlistBooking())
    UtsHelps.createWorkshopWaiting(workshopId, user.id, -1, (err, res) => {
      if (err) {
        dispatch(receiveWaitlistBookingError(err))
        callback(err)
      } else {
        dispatch(receiveWaitlistBookingSuccess(workshopId))
        callback(null, workshopId)
      }
    })
  }
}
