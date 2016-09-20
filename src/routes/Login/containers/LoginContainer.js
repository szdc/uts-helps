import React from 'react'
import { connect } from 'react-redux'

import { login } from '../modules/login'

import LoginForm from '../components/Login'

class LoginContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.LoginForm = LoginForm(login, '/deals')
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
      />
    )
  }
}
LoginContainer.propTypes = {
  location: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  email: state.user.id
})

export default connect(mapStateToProps)(LoginContainer)
