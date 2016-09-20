import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import CenterLayout from 'layouts/CenterLayout'
import Spinner from 'components/Spinner'
import { connectForm, redirectOnSuccess } from 'components/Form/Form'

import classes from './Login.scss'
import strings from './Login.strings'

export default (submitAction, redirectTo) => {
  @redirectOnSuccess(redirectTo)
  class Login extends React.Component {

    /**
     * Sets up the component.
     *
     * * @param props
     */
    constructor(props) {
      super(props)

      this.rxEmail = /^[^@]+?@[^@]+\.[^@]+$/gi
      this.state = {
        form: {
          email: '',
          password: ''
        },
        formErrors: {}
      }
      this._onFieldChange = ::this._onFieldChange
      this._onSubmit = ::this._onSubmit
    }

    /**
     * Updates the state with the new field value.
     *
     * @param e
     * @private
     */
    _onFieldChange(e) {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      })
    }

    /**
     * Validates the form.
     *
     * @private
     */
    _validate() {
      const { props } = this
      const { email, password } = this.state.form
      let formErrors = {}

      if (!email.length || email.search(this.rxEmail) === -1) {
        formErrors.email = props.errorEmail
      }

      if (!password.length) {
        formErrors.password = props.errorPassword
      }

      return formErrors
    }

    /**
     * Submits the form.
     *
     * @private
     */
    _onSubmit(e) {
      e.preventDefault()
      const formErrors = this._validate()

      this.setState({formErrors}, () => {
        if (!Object.keys(formErrors).length) {
          const { email, password } = this.state.form
          this.props.onSubmit(email, password)
        }
      })
    }

    /**
     * Renders the login form.
     *
     * @returns {XML}
     */
    render() {
      const { props } = this
      const { form, formErrors } = this.state

      return (
        <CenterLayout>
          <form
            className={classes.container}
            onChange={this._onFieldChange}
            onSubmit={this._onSubmit}
          >
            <TextField
              className={classes.input}
              errorText={formErrors.email}
              floatingLabelText={props.labelEmail}
              hintText={props.hintEmail}
              name='email'
              value={form.email}
            />
            <TextField
              className={classes.input}
              errorText={formErrors.password}
              floatingLabelText={props.labelPassword}
              name='password'
              type='password'
              value={form.password}
            />
            <br />
            <br />
            <div className={classes.formActions}>
              <RaisedButton
                label={!props.submitting && props.labelSubmit}
                icon={props.submitting && <Spinner size='small' />}
                type='submit'
              />
            </div>
          </form>
        </CenterLayout>
      )
    }
  }
  Login.propTypes = {
    errorEmail: React.PropTypes.string,
    errorPassword: React.PropTypes.string,
    hintEmail: React.PropTypes.string,
    labelEmail: React.PropTypes.string,
    labelPassword: React.PropTypes.string,
    labelSubmit: React.PropTypes.string,
    onSubmit: React.PropTypes.func
  }
  Login.defaultProps = {
    errorEmail: strings.errorEmail,
    errorPassword: strings.errorPassword,
    hintEmail: strings.hintEmail,
    labelEmail: strings.labelEmail,
    labelPassword: strings.labelPassword,
    labelSubmit: strings.labelSubmit
  }

  return connectForm(Login, submitAction)
}
