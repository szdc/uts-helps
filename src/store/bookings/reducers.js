import {
  REQUEST_BOOKINGS,
  RECEIVE_BOOKINGS_ERROR,
  RECEIVE_BOOKINGS_SUCCESS
} from './actions'
import {
  RECEIVE_ADD_BOOKING_SUCCESS
} from './actions/create'
import {
  RECEIVE_CANCEL_BOOKING_SUCCESS
} from './actions/cancel'

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
    case RECEIVE_ADD_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: [
          ...(state.bookings || []),
          action.payload
        ]
      }
    case RECEIVE_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: state.bookings ? state.bookings.filter(booking =>
          booking.workshopID !== action.payload
        ) : []
      }
    default:
      return state
  }
}
