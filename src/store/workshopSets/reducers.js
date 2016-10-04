import {
  REQUEST_WORKSHOP_SETS,
  RECEIVE_WORKSHOP_SETS_ERROR,
  RECEIVE_WORKSHOP_SETS_SUCCESS
} from './actions'

const initialState = {
  workshopSets: null,
  error: null,
  loading: false
}

export default function workshopSetsReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_WORKSHOP_SETS:
      return {
        ...state,
        ...initialState,
        loading: true
      }
    case RECEIVE_WORKSHOP_SETS_ERROR:
      return {
        ...state,
        workshopSets: initialState.workshopSets,
        error: action.error,
        loading: false
      }
    case RECEIVE_WORKSHOP_SETS_SUCCESS:
      return {
        ...state,
        workshopSets: action.payload,
        error: initialState.error,
        loading: false
      }
    default:
      return state
  }
}
