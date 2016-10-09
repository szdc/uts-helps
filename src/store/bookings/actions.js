export const REQUEST_BOOKINGS = 'REQUEST_BOOKINGS'
export const RECEIVE_BOOKINGS_ERROR = 'RECEIVE_BOOKINGS_ERROR'
export const RECEIVE_BOOKINGS_SUCCESS = 'RECEIVE_BOOKINGS_SUCCESS'

/**
 * Creates an action to request a list of bookings.
 *
 * @returns {{type: string}}
 */
export function requestBookings() {
  return {
    type: REQUEST_BOOKINGS
  }
}

/**
 * Creates an error action to retreiving list of bookings.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveBookingsError(err) {
  return {
    type: RECEIVE_BOOKINGS_ERROR,
    error: err
  }
}

/**
 * Creates an success action to retreiving list of bookings.
 *
 * @param bookings
 * @returns {{type: string, payload: *}}
 */
export function receiveBookingsSuccess(bookings) {
  return {
    type: RECEIVE_BOOKINGS_SUCCESS,
    payload: bookings
  }
}

/**
 * Retrieves a list of bookings.
 *
 * @returns {function(*, *, *)}
 */
export function fetchBookings() {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()

    dispatch(requestBookings())
    UtsHelps.searchWorkshopBookings({
      active: true,
      studentId: user.id
    }, (err, res) => {
      if (err) {
        dispatch(receiveBookingsError(err))
      } else {
        dispatch(receiveBookingsSuccess(res.Results))
      }
    })
  }
}
