export const REQUEST_CAMPUSES = 'REQUEST_CAMPUSES'
export const RECEIVE_CAMPUSES_ERROR = 'RECEIVE_CAMPUSES_ERROR'
export const RECEIVE_CAMPUSES_SUCCESS = 'RECEIVE_CAMPUSES_SUCCESS'

/**
 * Creates an action to request a list of campuses.
 *
 * @returns {{type: string}}
 */
export function requestCampuses() {
  return {
    type: REQUEST_CAMPUSES
  }
}

/**
 * Creates an error action to retreiving a list of campuses.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveCampusesError(err) {
  return {
    type: RECEIVE_CAMPUSES_ERROR,
    error: err
  }
}

/**
 * Creates an success action to retreiving a list of campuses.
 *
 * @param campuses
 * @returns {{type: string, payload: *}}
 */
export function receiveCampusesSuccess(campuses) {
  return {
    type: RECEIVE_CAMPUSES_SUCCESS,
    payload: campuses
  }
}

/**
 * Retrieves a list of campuses.
 *
 * @returns {function(*, *, *)}
 */
export function fetchCampuses() {
  return (dispatch, getState, UtsHelps) => {
    dispatch(requestCampuses())
    UtsHelps.getCampuses((err, res) => {
      if (err) {
        dispatch(receiveCampusesError(err))
      } else {
        dispatch(receiveCampusesSuccess(res.Results))
      }
    })
  }
}
