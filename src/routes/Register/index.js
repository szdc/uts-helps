export default (store) => ({
  path: 'register',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const RegisterContainer = require('./containers/RegisterContainer').default

      next(null, RegisterContainer)
    }, 'register')
  }
})
