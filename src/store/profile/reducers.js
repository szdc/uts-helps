import {
  REQUEST_USER_PROFILE,
  RECEIVE_USER_PROFILE
} from './actions'
import {
  USER_LOGIN_SUCCESS
} from '../user/actions'

const initialState = {
  error: null,
  loading: false,
  profile: null
}

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_PROFILE:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_USER_PROFILE:
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        error: action.error || null,
        loading: false,
        profile: action.payload
      }
    default:
      return state
  }
}
