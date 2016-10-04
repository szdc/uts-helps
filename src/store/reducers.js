import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import bookingsReducer from './bookings/reducers'
import profileReducer from './profile/reducers'
import userReducer from './user/reducers'
import workshopsReducer from './workshops/reducers'
import workshopSetsReducer from './workshopSets/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    ...asyncReducers,
    bookings: bookingsReducer,
    profile: profileReducer,
    user: userReducer,
    workshops: workshopsReducer,
    workshopSets: workshopSetsReducer
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
