export default (store) => ({
  path: 'login',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const LoginContainer = require('./containers/LoginContainer').default

      next(null, LoginContainer)
    }, 'login')
  }
})
