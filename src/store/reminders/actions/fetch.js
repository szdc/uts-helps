import request from 'superagent'

export const REQUEST_REMINDERS = 'REQUEST_REMINDERS'
export const RECEIVE_REMINDERS_ERROR = 'RECEIVE_REMINDERS_ERROR'
export const RECEIVE_REMINDERS_SUCCESS = 'RECEIVE_REMINDERS_SUCCESS'

/**
 * Creates an action to request a list of reminders.
 *
 * @returns {{type: string}}
 */
export function requestReminders() {
  return {
    type: REQUEST_REMINDERS
  }
}

/**
 * Creates an error action to retreiving list of reminders.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveRemindersError(err) {
  return {
    type: RECEIVE_REMINDERS_ERROR,
    error: err
  }
}

/**
 * Creates an success action to retreiving list of reminders.
 *
 * @param reminders
 * @returns {{type: string, payload: *}}
 */
export function receiveRemindersSuccess(reminders) {
  return {
    type: RECEIVE_REMINDERS_SUCCESS,
    payload: reminders
  }
}

/**
 * Retrieves a list of reminders.
 *
 * @returns {function(*, *, *)}
 */
export function fetchReminders() {
  return (dispatch, getState, UtsHelps) => {
    dispatch(requestReminders())
    request
      .get('http://utshelpsbackend.ddns.net/api/reminders')
      .end((err, res) => {
        if (err) {
          dispatch(receiveRemindersError(err))
        } else {
          dispatch(receiveRemindersSuccess(res.body))
        }
      })
  }
}
