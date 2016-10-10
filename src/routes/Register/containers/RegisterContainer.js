import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import RegisterForm from '../components/Register'
import register from '../modules/register'

import strings from './RegisterContainer.strings'

class RegisterContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this._returnToLogin = ::this._returnToLogin
    this.RegisterForm = RegisterForm(register, '/bookings')
  }

  /**
   * Updates the layout.
   */
  componentDidMount() {
    this.props.layout.setTitle(strings.page_title)
  }

  /**
   * Returns the user to the login screen.
   *
   * @private
   */
  _returnToLogin() {
    this.props.push('/login')
  }

  /**
   * Renders the register component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <this.RegisterForm
        onBackToLoginClick={this._returnToLogin}
        {...this.props}
      />
    )
  }
}
RegisterContainer.propTypes = {
  layout: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  id: state.user.id
})

const mapDispatchToProps = {
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
