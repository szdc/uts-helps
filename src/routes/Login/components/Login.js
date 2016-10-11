import React from 'react'
import Paper from 'material-ui/Paper'
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

      this.rxId = /^\d+$/gi
      this.state = {
        form: {
          id: '',
          password: ''
        },
        formErrors: {}
      }
      this._onFieldChange = ::this._onFieldChange
      this._onSubmit = ::this._onSubmit
    }

    /**
     * Notifies the creator if the user was not found.
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
      if (nextProps.error) {
        this.props.onUserNotFound()
      }
    }

    /**
     * Updates the state with the new field value.
     *
     * @param e
     * @private
     */
    _onFieldChange(e) {
      if (e.target.name === 'id' && e.target.value.search(this.rxId) === -1) {
        return
      }

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
      const { id, password } = this.state.form
      let formErrors = {}

      if (!id.length) {
        formErrors.id = props.errorIdMissing
      }
      if (id.search(this.rxId) === -1) {
        formErrors.id = props.errorIdInvalid
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
          const { id, password } = this.state.form
          this.props.onSubmit(id, password)
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
        <div className={classes.container}>
          <CenterLayout>
            <Paper>
              <form
                className={classes.formContainer}
                onChange={this._onFieldChange}
                onSubmit={this._onSubmit}
              >
                <img
                  className={classes.logo}
                  src='/images/logo2.png'
                />
                <TextField
                  className={classes.input}
                  errorText={props.errorIdInvalid}
                  floatingLabelText={props.labelId}
                  hintText={props.hintId}
                  name='id'
                  pattern='[0-9]*'
                  type='number'
                  value={form.id}
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
                    icon={props.submitting && <Spinner color='#fff' size='small' />}
                    primary
                    style={{maxHeight: '36px'}}
                    type='submit'
                  />
                </div>
              </form>
            </Paper>
          </CenterLayout>
        </div>
      )
    }
  }
  Login.propTypes = {
    errorIdMissing: React.PropTypes.string,
    errorIdInvalid: React.PropTypes.string,
    errorPassword: React.PropTypes.string,
    hintId: React.PropTypes.string,
    labelId: React.PropTypes.string,
    labelPassword: React.PropTypes.string,
    labelSubmit: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    onUserNotFound: React.PropTypes.func
  }
  Login.defaultProps = {
    errorIdMissing: strings.errorIdMissing,
    errorIdInvalid: strings.errorIdInvalid,
    errorPassword: strings.errorPassword,
    hintId: strings.hintId,
    labelId: strings.labelId,
    labelPassword: strings.labelPassword,
    labelSubmit: strings.labelSubmit
  }

  return connectForm(Login, submitAction)
}
