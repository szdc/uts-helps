import React from 'react'
import { connect } from 'react-redux'
import { login } from '../modules/login'
import { push } from 'react-router-redux'

import LoginForm from '../components/Login'

class LoginContainer extends React.Component {

  constructor(props) {
    super(props)
    // const redirectTo = this.props.location.query.r
    this.LoginForm = LoginForm(login, '/contacts')
  }

  render() {
    return (
      <this.LoginForm
        {...this.props}
      />
    )
  }
}
LoginContainer.propTypes = {
  location: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  email: state.user.email,
  rememberMe: state.user.rememberMe
})

const mapDispatchToProps = {
  forgotPassword: () => push('/forgot-password')
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
