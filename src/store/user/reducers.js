import {
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
  USER_NOT_FOUND
} from './actions'

const initialState = {
  id: '',
  isLoggedIn: false,
  isRegistering: false,
  rememberMe: false
}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        id: state.rememberMe ? state.id : '',
        isLoggedIn: false,
        isRegistering: false,
        rememberMe: state.rememberMe || false
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        id: action.payload.studentID,
        isLoggedIn: true,
        isRegistering: false
      }
    case USER_NOT_FOUND:
      return {
        ...state,
        id: action.payload,
        isLoggedIn: false,
        isRegistering: true
      }
    default:
      return state
  }
}
