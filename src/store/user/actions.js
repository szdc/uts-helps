import { push } from 'react-router-redux'

export const USER_LOGOUT = 'USER_LOGOUT'
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'

/**
 * Logs the user out and redirects to the login page.
 *
 * @returns {function(*)}
 */
export function logout() {
  return dispatch => {
    dispatch({type: USER_LOGOUT})
    dispatch(push('/login'))
  }
}
