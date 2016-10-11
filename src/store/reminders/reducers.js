import {
  REQUEST_REMINDERS,
  RECEIVE_REMINDERS_ERROR,
  RECEIVE_REMINDERS_SUCCESS
} from './actions/fetch'
import { RECEIVE_ADD_REMINDER_SUCCESS } from './actions/create'
import { RECEIVE_DELETE_REMINDER_SUCCESS } from './actions/delete'

const initialState = {
  reminders: null,
  error: null,
  loading: false
}

export default function remindersReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_REMINDERS:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_REMINDERS_ERROR:
      return {
        ...state,
        reminders: initialState.reminders,
        error: action.error,
        loading: false
      }
    case RECEIVE_REMINDERS_SUCCESS:
      return {
        ...state,
        reminders: action.payload,
        error: initialState.error,
        loading: false
      }
    case RECEIVE_ADD_REMINDER_SUCCESS:
      return {
        ...state,
        reminders: [
          ...(state.reminders || []),
          action.payload
        ]
      }
    case RECEIVE_DELETE_REMINDER_SUCCESS:
      return {
        ...state,
        reminders: state.reminders ? state.reminders.filter(reminder =>
          reminder._id !== action.payload
        ) : []
      }
    default:
      return state
  }
}
