import {
  REQUEST_CAMPUSES,
  RECEIVE_CAMPUSES_ERROR,
  RECEIVE_CAMPUSES_SUCCESS
} from './actions'

const initialState = {
  campuses: null,
  error: null,
  loading: false
}

export default function campusesReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CAMPUSES:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_CAMPUSES_ERROR:
      return {
        ...state,
        campuses: initialState.campuses,
        error: action.error,
        loading: false
      }
    case RECEIVE_CAMPUSES_SUCCESS:
      return {
        ...state,
        campuses: action.payload,
        error: initialState.error,
        loading: false
      }
    default:
      return state
  }
}
