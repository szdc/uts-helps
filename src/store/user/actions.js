import { push } from 'react-router-redux'

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'

/**
 * Creates an action to register a successful login.
 *
 * @returns {{type: string}}
 */
export function userLoginSuccess(user) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user
  }
}

/**
 * Creates an action to register a successful logout.
 *
 * @returns {{type: string}}
 */
export function userLogoutSuccess() {
  return {
    type: USER_LOGOUT
  }
}

/**
 * Attempts to log the user into the system.
 *
 * @param id
 * @param password
 * @param callback
 * @returns {function(*, *, *)}
 */
export function login(id, password, callback) {
  return (dispatch, getState, UtsHelps) => {
    UtsHelps.getStudent(id, (err, res) => {
      if (err) {
        callback(err)
      } else {
        dispatch(userLoginSuccess(res.Result))
        callback(null, res)
      }
    })
  }
}

/**
 * Logs the user out and redirects to the login page.
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    dispatch(userLogoutSuccess())
    dispatch(push('/login'))
  }
}
