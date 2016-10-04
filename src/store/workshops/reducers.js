import {
  REQUEST_WORKSHOPS,
  RECEIVE_WORKSHOPS_ERROR,
  RECEIVE_WORKSHOPS_SUCCESS
} from './actions'

const initialState = {
  workshops: null,
  error: null,
  loading: false
}

export default function workshopsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WORKSHOPS:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_WORKSHOPS_ERROR:
      return {
        ...state,
        workshops: initialState.workshops,
        error: action.error,
        loading: false
      }
    case RECEIVE_WORKSHOPS_SUCCESS:
      return {
        ...state,
        workshops: action.payload,
        error: initialState.error,
        loading: false
      }
    default:
      return state
  }
}
