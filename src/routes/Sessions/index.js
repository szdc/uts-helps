export default (store) => ({
  path: 'sessions',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const SessionsContainer = require('./containers/SessionsContainer').default

      next(null, SessionsContainer)
    }, 'sessions')
  }
})
