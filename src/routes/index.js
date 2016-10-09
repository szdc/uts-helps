// Layouts
import MobileLayout from 'layouts/MobileLayout'
import NoAuthLayout from 'layouts/NoAuthLayout'

// Routes
import LoginRoute from './Login'
import LogoutRoute from './Logout'
import RegisterRoute from './Register'
import NotFoundRoute from './NotFound'

// Bookings
import BookingsRoute from './Bookings'

// Workshops
import WorkshopSetsRoute from './WorkshopSets'
import WorkshopsRoute from './Workshops'

// Authentication
import { requireAuth, requireNoAuth, requireRegistering } from 'utils/auth'

export const createRoutes = (store, api) => ({
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/login')
  },
  childRoutes: [
    {
      component: NoAuthLayout,
      onEnter: requireNoAuth(store),
      childRoutes: [
        LoginRoute(store)
      ]
    },
    {
      component: NoAuthLayout,
      onEnter: requireRegistering(store),
      childRoutes: [
        RegisterRoute(store)
      ]
    },
    {
      component: MobileLayout,
      onEnter: requireAuth(store),
      childRoutes: [
        BookingsRoute(store),
        LogoutRoute(store),
        WorkshopsRoute(store),
        WorkshopSetsRoute(store),
        NotFoundRoute(store)
      ]
    }
  ]
})

export default createRoutes
