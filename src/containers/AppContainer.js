import React, { Component, PropTypes } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import theme from 'theme'

class AppContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { history, routes, store } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={theme}>
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default AppContainer
