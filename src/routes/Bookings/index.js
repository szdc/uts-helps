export default (store) => ({
  path: 'bookings',

  getComponent(nextState, next) {
    require.ensure([], (require) => {
      const BookingsContainer = require('./containers/BookingsContainer').default

      next(null, BookingsContainer)
    }, 'bookings')
  }
})
