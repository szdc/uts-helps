import React from 'react'
import { connectForm, redirectOnSuccess } from 'components/Form/Form'

export default (submitAction, redirectTo) => {
  @redirectOnSuccess(redirectTo)
  class Login extends React.Component {

    /**
     * Renders the login form.
     *
     * @returns {XML}
     */
    render() {
      return (
        <h1>Login form</h1>
      )
    }
  }

  return connectForm(Login, submitAction)
}
