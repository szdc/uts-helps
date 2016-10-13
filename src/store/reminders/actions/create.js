import request from 'superagent'

export const REQUEST_ADD_REMINDER = 'REQUEST_ADD_REMINDER'
export const RECEIVE_ADD_REMINDER_ERROR = 'RECEIVE_ADD_REMINDER_ERROR'
export const RECEIVE_ADD_REMINDER_SUCCESS = 'RECEIVE_ADD_REMINDER_SUCCESS'

/**
 * Creates an action to request a reminder be added to a booking.
 *
 * @returns {{type: string}}
 */
export function requestAddReminder() {
  return {
    type: REQUEST_ADD_REMINDER
  }
}

/**
 * Creates an error action to receive an add reminder error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveAddReminderError(err) {
  return {
    type: RECEIVE_ADD_REMINDER_ERROR,
    error: err
  }
}

/**
 * Creates an success action to receive an add reminder success response.
 *
 * @param workshopId
 * @returns {{type: string, payload: *}}
 */
export function receiveAddReminderSuccess(workshopId) {
  return {
    type: RECEIVE_ADD_REMINDER_SUCCESS,
    payload: workshopId
  }
}

/**
 * Creates a reminder
 *
 * @param params
 * @param type
 * @param callback
 * @returns {function(*, *, *)}
 */
export function createReminder(params, type, callback) {
  return (dispatch, getState, UtsHelps) => {
    const { user } = getState()
    params.studentId = user.id

    switch (type) {
      case 'sms':
        params.mobile = '+61426810913'
        break
      case 'email':
      default:
        params.email = `${user.id}@uts.edu.au`
    }

    dispatch(requestAddReminder())

    request
      .post('http://utshelpsbackend.ddns.net/api/reminders')
      .send(params)
      .end((err, res) => {
        if (err) {
          dispatch(receiveAddReminderError(err))
          callback(err)
        } else {
          dispatch(receiveAddReminderSuccess(res.body))
          callback(null, res.body)
        }
      })
  }
}
