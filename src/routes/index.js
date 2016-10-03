// Layouts
import MobileLayout from 'layouts/MobileLayout'
import NoAuthLayout from 'layouts/NoAuthLayout'

// Routes
import LoginRoute from './Login'
import LogoutRoute from './Logout'
import RegisterRoute from './Register'
import NotFoundRoute from './NotFound'

export const createRoutes = (store, api) => ({
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/login')
  },
  childRoutes: [
    {
      component: NoAuthLayout,
      childRoutes: [
        LoginRoute(store),
        RegisterRoute(store)
      ]
    },
    {
      component: MobileLayout,
      childRoutes: [
        LogoutRoute(store),
        NotFoundRoute(store)
      ]
    }
  ]
})

export default createRoutes
