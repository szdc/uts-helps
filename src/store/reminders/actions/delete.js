import request from 'superagent'

export const REQUEST_DELETE_REMINDER = 'REQUEST_DELETE_REMINDER'
export const RECEIVE_DELETE_REMINDER_ERROR = 'RECEIVE_DELETE_REMINDER_ERROR'
export const RECEIVE_DELETE_REMINDER_SUCCESS = 'RECEIVE_DELETE_REMINDER_SUCCESS'

/**
 * Creates an action to request a reminder be deleted from a booking.
 *
 * @returns {{type: string}}
 */
export function requestDeleteReminder() {
  return {
    type: REQUEST_DELETE_REMINDER
  }
}

/**
 * Creates an error action to receive a delete reminder error response.
 *
 * @param err
 * @returns {{type: string, error: *}}
 */
export function receiveDeleteReminderError(err) {
  return {
    type: RECEIVE_DELETE_REMINDER_ERROR,
    error: err
  }
}

/**
 * Creates a success action to receive a delete reminder success response.
 *
 * @param reminderId
 * @returns {{type: string, payload: *}}
 */
export function receiveDeleteReminderSuccess(reminderId) {
  return {
    type: RECEIVE_DELETE_REMINDER_SUCCESS,
    payload: reminderId
  }
}

/**
 * Deletes a reminder.
 *
 * @param reminderId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function deleteReminder(reminderId, callback) {
  return (dispatch, getState) => {
    dispatch(requestDeleteReminder())
    request
      .delete(`http://utshelpsbackend.ddns.net/api/reminders/${reminderId}`)
      .end((err, res) => {
        if (err) {
          dispatch(receiveDeleteReminderError(err))
          callback(err)
        } else {
          dispatch(receiveDeleteReminderSuccess(res.body._id))
          callback(null, res.body)
        }
      })
  }
}

/**
 * Deletes all reminders associated with a workshop.
 *
 * @param workshopId
 * @param callback
 * @returns {function(*, *, *)}
 */
export function deleteAllReminders(workshopId, callback) {
  return (dispatch, getState) => {
    dispatch(requestDeleteReminder())
    const { user } = getState()

    request
      .delete('http://utshelpsbackend.ddns.net/api/reminders/all')
      .query({ workshopId, studentId: user.id })
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
      })
  }
}
