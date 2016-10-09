export const REQUEST_WORKSHOPS = 'REQUEST_WORKSHOPS'
export const RECEIVE_WORKSHOPS_ERROR = 'RECEIVE_WORKSHOPS_ERROR'
export const RECEIVE_WORKSHOPS_SUCCESS = 'RECEIVE_WORKSHOPS_SUCCESS'

/**
 * Creates an action to request a list of workshops.
 *
 * @returns {{type: string}}
 */
export function requestWorkshops() {
  return {
    type: REQUEST_WORKSHOPS
  }
}

/**
 * Creates an error action to retreiving list of workshops.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveWorkshopsError(err) {
  return {
    type: RECEIVE_WORKSHOPS_ERROR,
    error: err
  }
}

/**
 * Creates an success action to retreiving list of workshops.
 *
 * @param workshops
 * @returns {{type: string, payload: *}}
 */
export function receiveWorkshopsSuccess(workshops) {
  return {
    type: RECEIVE_WORKSHOPS_SUCCESS,
    payload: workshops
  }
}

/**
 * Retrieves a list of workshops that match the search parameters.
 *
 * @param params
 * @returns {function(*, *, *)}
 */
export function searchWorkshops(params) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()
    params.studentId = user.id
    params.active = true

    dispatch(requestWorkshops())
    UtsHelps.searchWorkshops(params, (err, res) => {
      if (err) {
        dispatch(receiveWorkshopsError(err))
      } else {
        dispatch(receiveWorkshopsSuccess(res.Results))
      }
    })
  }
}

/**
 * Updates a workshop.
 *
 * @param workshopId
 * @param fields
 * @returns {function(*, *, *)}
 */
export function updateWorkshop(workshopId, fields) {
  return (dispatch, getState, UtsHelps) => {
    const workshops = getState().workshops.workshops
    const updatedWorkshops = workshops.map(workshop => {
      if (workshop.WorkshopId === workshopId) {
        workshop = {...workshop, ...fields, workshopID: workshop.workshopID}
      }
      return workshop
    })
    dispatch(receiveWorkshopsSuccess(updatedWorkshops))
  }
}
