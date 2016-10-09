import { updateWorkshop } from '../../workshops/actions'

export const REQUEST_ADD_BOOKING = 'REQUEST_ADD_BOOKING'
export const RECEIVE_ADD_BOOKING_ERROR = 'RECEIVE_ADD_BOOKING_ERROR'
export const RECEIVE_ADD_BOOKING_SUCCESS = 'RECEIVE_ADD_BOOKING_SUCCESS'

/**
 * Creates an action to request a booking be added.
 *
 * @returns {{type: string}}
 */
export function requestAddBooking() {
  return {
    type: REQUEST_ADD_BOOKING
  }
}

/**
 * Creates an error action to receive an add booking error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveAddBookingError(err) {
  return {
    type: RECEIVE_ADD_BOOKING_ERROR,
    error: err
  }
}

/**
 * Creates an success action to receive an add booking success response.
 *
 * @param booking
 * @returns {{type: string, payload: *}}
 */
export function receiveAddBookingSuccess(booking) {
  return {
    type: RECEIVE_ADD_BOOKING_SUCCESS,
    payload: booking
  }
}

/**
 * Adds a new booking.
 *
 * @param workshopId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function createBooking(workshopId, callback) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()

    dispatch(requestAddBooking())
    UtsHelps.createWorkshopBooking(workshopId, user.id, -1, (err, res) => {
      if (err) {
        dispatch(receiveAddBookingError(err))
        callback(err)
      } else {
        dispatch(receiveAddBookingSuccess(res.Result))
        dispatch(updateWorkshop(res.Result.workshopID, {bookingId: res.Result.id}))
        callback(null, res.Result)
      }
    })
  }
}
