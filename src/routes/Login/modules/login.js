/**
 * Attempts to log the user into the system.
 *
 * @param id
 * @param password
 * @param callback
 * @returns {function(*, *, *)}
 */
export function login(id, password, callback) {
  return (dispatch, getState, api) => {
    setTimeout(() => {
      callback(null)
    }, 1000)
  }
}
