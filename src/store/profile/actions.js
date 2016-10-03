export const REQUEST_USER_PROFILE = 'REQUEST_USER_PROFILE'
export const RECEIVE_USER_PROFILE = 'RECEIVE_USER_PROFILE'

/**
 * Creates an action to request a user profile.
 *
 * @returns {{type: string}}
 */
export function requestUserProfile() {
  return {
    type: REQUEST_USER_PROFILE
  }
}

/**
 * Creates an action to receive a user profile.
 *
 * @param err
 * @param profile
 * @returns {{type: string, error: *, payload: *}}
 */
export function receiveUserProfile(err, profile) {
  return {
    type: RECEIVE_USER_PROFILE,
    error: err,
    payload: profile
  }
}

/**
 * Fetches the profile of the specified user.
 *
 * @param userId
 * @returns {function(*, *, *)}
 */
export function fetchUserProfile(userId) {
  return (dispatch, getState, UtsHelps) => {
    if (!userId) {
      userId = getState().user.id.trim()
    }

    dispatch(requestUserProfile())
    UtsHelps.getStudent(userId, (err, res) => {
      if (err) {
        dispatch(receiveUserProfile(err))
      } else {
        dispatch(receiveUserProfile(null, res.Result))
      }
    })
  }
}
