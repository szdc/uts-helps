import { deleteAllReminders } from 'store/reminders/actions/delete'

export const REQUEST_CANCEL_BOOKING = 'REQUEST_CANCEL_BOOKING'
export const RECEIVE_CANCEL_BOOKING_ERROR = 'RECEIVE_CANCEL_BOOKING_ERROR'
export const RECEIVE_CANCEL_BOOKING_SUCCESS = 'RECEIVE_CANCEL_BOOKING_SUCCESS'

/**
 * Creates an action to request a booking be canceled.
 *
 * @returns {{type: string}}
 */
export function requestCancelBooking() {
  return {
    type: REQUEST_CANCEL_BOOKING
  }
}

/**
 * Creates an error action to receive an cancel booking error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveCancelBookingError(err) {
  return {
    type: RECEIVE_CANCEL_BOOKING_ERROR,
    error: err
  }
}

/**
 * Creates an success action to receive an cancel booking success response.
 *
 * @param workshopId
 * @returns {{type: string, payload: *}}
 */
export function receiveCancelBookingSuccess(workshopId) {
  return {
    type: RECEIVE_CANCEL_BOOKING_SUCCESS,
    payload: workshopId
  }
}

/**
 * Cancels a booking.
 *
 * @param workshopId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function cancelBooking(workshopId, callback) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()

    dispatch(requestCancelBooking())
    UtsHelps.cancelWorkshopBooking(workshopId, user.id, -1, (err, res) => {
      if (err) {
        dispatch(receiveCancelBookingError(err))
        callback(err)
      } else {
        dispatch(receiveCancelBookingSuccess(workshopId))
        dispatch(deleteAllReminders(workshopId))
        callback(null, workshopId)
      }
    })
  }
}
