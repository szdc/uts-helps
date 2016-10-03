/**
 * Attempts to log the user into the system.
 *
 * @param id
 * @param password
 * @param callback
 * @returns {function(*, *, *)}
 */
export function login(id, password, callback) {
  return (dispatch, getState, UtsHelps) => {
    UtsHelps.getStudent(id, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res)
      }
      callback(null)
    })
  }
}
