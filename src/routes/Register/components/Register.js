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
          id: props.id,
          countryOrigin: props.countryOrigin,
          degree: props.degree,
          firstLanguage: props.firstLanguage,
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
      let formErrors = {}

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
              onChange={this._onDateChange}
              textFieldStyle={inputStyle}
              style={inputStyle}
            />
            <SelectField
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
            <br />
            <br />
            <div className={classes.formActions}>
              <RaisedButton
                label={!props.submitting && strings.labelSubmit}
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
    countryOrigin: React.PropTypes.string,
    degree: React.PropTypes.string,
    firstLanguage: React.PropTypes.string,
    id: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    status: React.PropTypes.string
  }
  Register.defaultProps = {
    countryOrigin: 'Australia',
    degree: 'UG',
    firstLanguage: 'English',
    status: 'Local'
  }

  return connectForm(Register, submitAction)
}
