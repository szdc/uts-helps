import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import LoginForm from '../components/Login'
import { login } from 'store/user/actions'

class LoginContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.LoginForm = LoginForm(login, '/bookings')
    this._onUserNotFound = ::this._onUserNotFound
  }

  /**
   * Redirects to the login page if the user is not found.
   *
   * @private
   */
  _onUserNotFound() {
    this.props.push('/register')
  }

  /**
   * Renders the login component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <this.LoginForm
        {...this.props}
        onUserNotFound={this._onUserNotFound}
      />
    )
  }
}
LoginContainer.propTypes = {
  push: React.PropTypes.func
}

const mapStateToProps = state => ({
  email: state.user.id
})

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
