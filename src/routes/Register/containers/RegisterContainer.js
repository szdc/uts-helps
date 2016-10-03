import React from 'react'
import { connect } from 'react-redux'

import RegisterForm from '../components/Register'
import register from '../modules/register'

class RegisterContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.RegisterForm = RegisterForm(register, '/bookings')
  }

  /**
   * Renders the register component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <this.RegisterForm
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  id: state.user.id
})

export default connect(mapStateToProps)(RegisterContainer)
