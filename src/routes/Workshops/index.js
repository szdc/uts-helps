export default (store) => ({
  path: 'workshop-set/:id',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const WorkshopsContainer = require('./containers/WorkshopsContainer').default

      next(null, WorkshopsContainer)
    }, 'workshop-set')
  }
})
