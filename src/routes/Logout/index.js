export default (store) => ({
  path: 'logout',

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const LogoutContainer = require('./containers/LogoutContainer').default

      cb(null, LogoutContainer)
    }, 'logout')
  }
})
