import React from 'react'
import { connect } from 'react-redux'

import { login } from '../modules/login'

import LoginForm from '../components/Login'

class LoginContainer extends React.Component {

  constructor(props) {
    super(props)
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
  email: state.user.id,
  rememberMe: state.user.rememberMe
})

export default connect(mapStateToProps)(LoginContainer)
