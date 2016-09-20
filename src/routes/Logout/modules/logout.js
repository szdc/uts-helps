import { push } from 'react-router-redux'
import { USER_LOGOUT } from 'store/user/actions'

/**
 * Logs the user out and returns to the login screen
 */
export function logout() {
  return (dispatch, getState) => {
    dispatch({
      type: USER_LOGOUT
    })
    dispatch(push('/login'))
  }
}
