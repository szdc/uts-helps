export default (store) => ({
  path: 'programmes',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const ProgrammesContainer = require('./containers/ProgrammesContainer').default

      next(null, ProgrammesContainer)
    }, 'programmes')
  }
})
