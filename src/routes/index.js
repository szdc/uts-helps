// Layouts
import NoAuthLayout from 'layouts/NoAuthLayout'

// Routes
import LoginRoute from './Login'

export const createRoutes = (store) => ({
  path: '/',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/login')
  },
  childRoutes: [
    {
      component: NoAuthLayout,
      childRoutes: [
        LoginRoute(store)
      ]
    }
  ]
})

export default createRoutes
