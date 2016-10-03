import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

import CenterLayout from 'layouts/CenterLayout'
import Spinner from 'components/Spinner'
import { connectForm, redirectOnSuccess } from 'components/Form/Form'

import classes from './Register.scss'
import strings from './Register.strings'

export default (submitAction, redirectTo) => {
  @redirectOnSuccess(redirectTo)
  class Register extends React.Component {

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
          firstLanguage: 'English',
          countryOrigin: 'Australia'
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

      const inputStyle = {
        width: '100%'
      }

      return (
        <CenterLayout>
          <form
            className={classes.container}
            onChange={this._onFieldChange}
            onSubmit={this._onSubmit}
          >
            <TextField
              disabled
              errorText={formErrors.id}
              floatingLabelText={strings.labelId}
              name='id'
              style={inputStyle}
              value={form.id}
            />
            <DatePicker
              floatingLabelText={strings.labelDob}
              hintText='Date Picker'
              textFieldStyle={inputStyle}
              style={inputStyle}
            />
            <SelectField
              floatingLabelText={strings.labelDegree}
              value='UG'
              style={inputStyle}
            >
              <MenuItem value='UG' primaryText='Undergraduate' />
              <MenuItem value='PG' primaryText='Postgraduate' />
            </SelectField>
            <SelectField
              floatingLabelText={strings.labelStatus}
              value='Local'
              style={inputStyle}
            >
              <MenuItem value='Local' primaryText='Local' />
              <MenuItem value='International' primaryText='International' />
            </SelectField>
            <TextField
              className={classes.input}
              errorText={formErrors.firstLanguage}
              floatingLabelText={strings.labelFirstLanguage}
              name='firstLanguage'
              value={form.firstLanguage}
            />
            <TextField
              className={classes.input}
              errorText={formErrors.countryOrigin}
              floatingLabelText={strings.labelCountryOrigin}
              name='countryOrigin'
              value={form.countryOrigin}
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
  Register.propTypes = {
    onSubmit: React.PropTypes.func
  }

  return connectForm(Register, submitAction)
}
