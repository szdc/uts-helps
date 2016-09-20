export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'

export function requestUserProfile() {
  return {
    type: REQUEST_USER_PROFILE
  }
}

export function receiveUserProfile(err, profile) {
  return {
    type: RECEIVE_USER_PROFILE,
    error: err,
    payload: profile
  }
}

export function fetchUserProfile() {
  return (dispatch, getState, api) => {
    const profile = {
      name: 'Example student'
    }

    dispatch(requestUserProfile())
    dispatch(receiveUserProfile(null, profile))
  }
}
