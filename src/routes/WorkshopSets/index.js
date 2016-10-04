export default (store) => ({
  path: 'workshop-sets',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const WorkshopSetsContainer = require('./containers/WorkshopSetsContainer').default

      next(null, WorkshopSetsContainer)
    }, 'workshop-sets')
  }
})
