import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import profileReducer from './profile/reducers'
import userReducer from './user/reducers'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    ...asyncReducers,
    profile: profileReducer,
    user: userReducer
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
