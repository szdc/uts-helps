export default (store) => ({
  path: 'workshops',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const WorkshopsContainer = require('./containers/WorkshopsContainer').default

      next(null, WorkshopsContainer)
    }, 'workshops')
  }
})
