/**
 * Determines if a user is currently logged in.
 *
 * @param user
 * @returns {boolean}
 */
const userIsNotLoggedIn = user => {
  return !user || !user.isLoggedIn
}

/**
 * Determines if a user is currently registering.
 *
 * @param user
 * @returns {boolean}
 */
const userIsRegistering = user => {
  return user && user.isRegistering
}

/**
 * Redirects the login page if they are not logged in.
 *
 * @param store
 * @returns {function(*, *, *)}
 */
const requireAuth = store => {
  return (nextState, replace, callback) => {
    const { user } = store.getState()
    if (userIsNotLoggedIn(user)) {
      replace('/login')
    }
    callback()
  }
}

/**
 * Redirects the user to the dashboard if they are already logged in.
 *
 * @param {Object} store - The Redux store.
 */
const requireNoAuth = (store) => {
  return (nextState, replace) => {
    const { user } = store.getState()
    if (user && user.isLoggedIn) {
      replace('/bookings')
    }
  }
}

/**
 * Redirects the user to the login page if they are currently registering.
 *
 * @param {Object} store - The Redux store.
 */
const requireRegistering = (store) => {
  return (nextState, replace) => {
    const { user } = store.getState()
    if (!userIsRegistering(user)) {
      replace('/login')
    }
  }
}

export {
  requireAuth as default,
  requireAuth,
  requireNoAuth,
  requireRegistering
}
