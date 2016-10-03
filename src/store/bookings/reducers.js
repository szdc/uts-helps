import {
  REQUEST_BOOKINGS,
  RECEIVE_BOOKINGS_ERROR,
  RECEIVE_BOOKINGS_SUCCESS
} from './actions'

const initialState = {
  bookings: null,
  error: null,
  loading: false
}

export default function bookingsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BOOKINGS:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_BOOKINGS_ERROR:
      return {
        ...state,
        bookings: initialState.bookings,
        error: action.error,
        loading: false
      }
    case RECEIVE_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
        error: initialState.error,
        loading: false
      }
    default:
      return state
  }
}
