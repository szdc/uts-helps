import { login, register } from 'store/user/actions'
import async from 'async'

/**
 * Attempts to register and login a student.
 *
 * @param userDetails
 * @param registerStudentCallback
 * @returns {function(*, *, *)}
 */
export default function registerStudent(userDetails, registerStudentCallback) {
  return (dispatch, getState, UtsHelps) => {
    async.series([
      callback => dispatch(register(userDetails, callback)),
      callback => dispatch(login(userDetails.id, 'password', callback))
    ], (err, res) => {
      if (err) {
        registerStudentCallback(err)
      } else {
        registerStudentCallback(null, res)
      }
    })
  }
}
