import {
  REQUEST_WORKSHOPS,
  RECEIVE_WORKSHOPS_ERROR,
  RECEIVE_WORKSHOPS_SUCCESS
} from './actions'
import {
  RECEIVE_CANCEL_BOOKING_SUCCESS
} from '../bookings/actions/cancel'
import {
  RECEIVE_WAITLIST_BOOKING_SUCCESS
} from '../bookings/actions/waitlist'

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
    case RECEIVE_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        workshops: state.workshops ? state.workshops.map(workshop => {
          if (workshop.WorkshopId === action.payload) {
            return {
              ...workshop,
              bookingId: null
            }
          }
          return workshop
        }) : []
      }
    case RECEIVE_WAITLIST_BOOKING_SUCCESS:
      return {
        ...state,
        workshops: state.workshops ? state.workshops.map(workshop => {
          if (workshop.WorkshopId === action.payload) {
            return {
              ...workshop,
              isWaitlisted: true
            }
          }
          return workshop
        }) : []
      }
    default:
      return state
  }
}
