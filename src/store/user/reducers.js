import {
  USER_LOGOUT,
  USER_LOGIN_SUCCESS
} from './actions'

const initialState = {
  id: '',
  isLoggedIn: false,
  rememberMe: false
}
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        id: state.rememberMe ? state.id : '',
        isLoggedIn: false,
        rememberMe: state.rememberMe || false
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true
      }
    default:
      return state
  }
}
