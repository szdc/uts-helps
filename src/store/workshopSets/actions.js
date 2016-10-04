export const REQUEST_WORKSHOP_SETS = 'REQUEST_WORKSHOP_SETS'
export const RECEIVE_WORKSHOP_SETS_ERROR = 'RECEIVE_WORKSHOP_SETS_ERROR'
export const RECEIVE_WORKSHOP_SETS_SUCCESS = 'RECEIVE_WORKSHOP_SETS_SUCCESS'

/**
 * Creates an action to request a list of workshop sets.
 *
 * @returns {{type: string}}
 */
export function requestWorkshopSets() {
  return {
    type: REQUEST_WORKSHOP_SETS
  }
}

/**
 * Creates an error action to retreiving list of workshop sets.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveWorkshopSetsError(err) {
  return {
    type: RECEIVE_WORKSHOP_SETS_ERROR,
    error: err
  }
}

/**
 * Creates an success action to retreiving list of workshop sets.
 *
 * @param workshopSets
 * @returns {{type: string, payload: *}}
 */
export function receiveWorkshopSetsSuccess(workshopSets) {
  return {
    type: RECEIVE_WORKSHOP_SETS_SUCCESS,
    payload: workshopSets
  }
}

/**
 * Retrieves a list of workshop sets.
 *
 * @returns {function(*, *, *)}
 */
export function fetchWorkshopSets() {
  return (dispatch, getState, UtsHelps) => {
    dispatch(requestWorkshopSets())
    UtsHelps.getWorkshopSets((err, res) => {
      if (err) {
        dispatch(receiveWorkshopSetsError(err))
      } else {
        dispatch(receiveWorkshopSetsSuccess(res.Results))
      }
    })
  }
}
