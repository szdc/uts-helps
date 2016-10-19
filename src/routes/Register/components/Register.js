import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
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
     * @param props
     */
    constructor(props) {
      super(props)

      this.rxNumber = /^[0-9]+$/gi
      this.state = {
        form: {
          altContact: props.altContact,
          countryOrigin: props.countryOrigin,
          degree: props.degree,
          dateOfBirth: null,
          firstLanguage: props.firstLanguage,
          id: props.id,
          status: props.status
        },
        formErrors: {}
      }
      this._onDateChange = ::this._onDateChange
      this._onFieldChange = ::this._onFieldChange
      this._onSelectDegreeChange = ::this._onSelectDegreeChange
      this._onSelectStatusChange = ::this._onSelectStatusChange
      this._onSubmit = ::this._onSubmit
    }

    /**
     * Updates the state with the new field value.
     *
     * @param e
     * @private
     */
    _onFieldChange(e) {
      if (e.target.name === 'altContact' && e.target.value.search(this.rxNumber) === -1 && e.target.value.length > 0) {
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
     * Generates a field change event.
     *
     * @param name
     * @param value
     * @private
     */
    _generateFieldChangeEvent(name, value) {
      this._onFieldChange({
        target: {
          name,
          value
        }
      })
    }

    /**
     * Handles a change on the date field.
     *
     * @param e
     * @param date
     * @private
     */
    _onDateChange(e, date) {
      this._generateFieldChangeEvent('dateOfBirth', date)
    }

    /**
     * Handles a change to the select status field.
     *
     * @param e
     * @param key
     * @param payload
     * @private
     */
    _onSelectStatusChange(e, key, payload) {
      this._generateFieldChangeEvent('status', payload)
    }

    /**
     * Handles a change to the select degree field.
     *
     * @param e
     * @param key
     * @param payload
     * @private
     */
    _onSelectDegreeChange(e, key, payload) {
      this._generateFieldChangeEvent('degree', payload)
    }

    /**
     * Validates the form.
     *
     * @private
     */
    _validate() {
      const { form } = this.state
      let formErrors = {}

      if (!form.altContact || !form.altContact.length) {
        formErrors.altContact = strings.errorAltContact
      }

      if (!form.countryOrigin || !form.countryOrigin.length) {
        formErrors.countryOrigin = strings.errorCountryOrigin
      }

      if (!form.degree || !form.degree.length) {
        formErrors.degree = strings.errorDegree
      }

      if (!form.dateOfBirth) {
        formErrors.dateOfBirth = strings.errorDateOfBirth
      }

      if (!form.firstLanguage || !form.firstLanguage.length) {
        formErrors.firstLanguage = strings.errorFirstLanguage
      }

      if (!form.status || !form.status.length) {
        formErrors.status = strings.errorStatus
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
          this.props.onSubmit(this.state.form)
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
        <div className={classes.container}>
          <CenterLayout>
            <Paper>
              <form
                className={classes.formContainer}
                onChange={this._onFieldChange}
                onSubmit={this._onSubmit}
              >
                <h1 className={classes.title}>Register your details</h1>
                <TextField
                  disabled
                  errorText={formErrors.id}
                  floatingLabelText={strings.labelId}
                  name='id'
                  style={inputStyle}
                  value={form.id}
                />
                <DatePicker
                  errorText={formErrors.dateOfBirth}
                  floatingLabelText={strings.labelDob}
                  formatDate={props.dateFormat}
                  onChange={this._onDateChange}
                  textFieldStyle={inputStyle}
                  style={inputStyle}
                />
                <SelectField
                  errorText={formErrors.degree}
                  floatingLabelText={strings.labelDegree}
                  name='degree'
                  onChange={this._onSelectDegreeChange}
                  value={form.degree}
                  style={inputStyle}
                >
                  <MenuItem value='UG' primaryText='Undergraduate' />
                  <MenuItem value='PG' primaryText='Postgraduate' />
                </SelectField>
                <SelectField
                  errorText={formErrors.status}
                  floatingLabelText={strings.labelStatus}
                  name='status'
                  onChange={this._onSelectStatusChange}
                  value={form.status}
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
                <TextField
                  className={classes.input}
                  errorText={formErrors.altContact}
                  floatingLabelText={strings.labelAltContact}
                  floatingLabelFixed
                  name='altContact'
                  pattern='[0-9]*'
                  type='number'
                  value={form.altContact}
                />
                <br />
                <br />
                <div className={classes.formActions}>
                  <FlatButton
                    label={strings.labelLogin}
                    onTouchTap={props.onBackToLoginClick}
                    style={{marginRight: '10px'}}
                  />
                  <RaisedButton
                    label={!props.submitting && strings.labelSubmit}
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
  Register.propTypes = {
    altContact: React.PropTypes.string,
    countryOrigin: React.PropTypes.string,
    dateFormat: React.PropTypes.func,
    degree: React.PropTypes.string,
    firstLanguage: React.PropTypes.string,
    id: React.PropTypes.string,
    onBackToLoginClick: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    status: React.PropTypes.string
  }
  Register.defaultProps = {
    altContact: '',
    countryOrigin: 'Australia',
    dateFormat: new window.Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format,
    degree: 'UG',
    firstLanguage: 'English',
    status: 'Local'
  }

  return connectForm(Register, submitAction)
}
