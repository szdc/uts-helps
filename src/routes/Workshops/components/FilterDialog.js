import React from 'react'
import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'

import strings from './FilterDialog.strings'

export default class FilterDialog extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      form: {
        campusId: null,
        startDate: null,
        endDate: null,
        topic: ''
      }
    }
    this._onEndDateChange = ::this._onEndDateChange
    this._onFieldChange = ::this._onFieldChange
    this._onSelectCampusChange = ::this._onSelectCampusChange
    this._onStartDateChange = ::this._onStartDateChange
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
    }, () => this.props.onFilterChange(this.state.form))
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
   * Handles a change to the campus field.
   *
   * @param e
   * @param key
   * @param payload
   * @private
   */
  _onSelectCampusChange(e, key, payload) {
    this.setState({
      form: {
        ...this.state.form,
        campusId: payload,
        campus: this.props.campuses[key]
      }
    }, () => this.props.onFilterChange(this.state.form))
  }

  /**
   * Handles a change on the start date field.
   *
   * @param e
   * @param date
   * @private
   */
  _onStartDateChange(e, date) {
    this._generateFieldChangeEvent('startDate', date)
  }

  /**
   * Handles a change on the end date field.
   *
   * @param e
   * @param date
   * @private
   */
  _onEndDateChange(e, date) {
    this._generateFieldChangeEvent('endDate', date)
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const { campuses, dateFormat, maxDate, minDate } = this.props
    const { form } = this.state

    // Normalise date times
    maxDate.setHours(0, 0, 0, 0)
    minDate.setHours(0, 0, 0, 0)

    const inputStyle = {
      width: '100%'
    }

    return (
      <div>
        <DatePicker
          formatDate={dateFormat}
          floatingLabelText={strings.hint_start_date}
          floatingLabelFixed
          minDate={minDate}
          onChange={this._onStartDateChange}
          textFieldStyle={inputStyle}
          style={inputStyle}
        />
        <DatePicker
          formatDate={dateFormat}
          floatingLabelText={strings.hint_end_date}
          floatingLabelFixed
          minDate={minDate}
          onChange={this._onEndDateChange}
          textFieldStyle={inputStyle}
          style={inputStyle}
        />
        <SelectField
          floatingLabelText={strings.label_campus}
          floatingLabelFixed
          hintText={strings.hint_campus}
          name='campus'
          onChange={this._onSelectCampusChange}
          style={inputStyle}
          value={form.campusId}
        >
          {campuses.map(campus => (
            <MenuItem
              key={campus.id}
              primaryText={campus.campus}
              value={campus.id}
            />
          ))}
        </SelectField>
        <TextField
          floatingLabelText={strings.label_topic}
          floatingLabelFixed
          name='topic'
          onChange={this._onFieldChange}
          style={{width: '100%'}}
          value={form.topic}
        />
      </div>
    )
  }
}
FilterDialog.propTypes = {
  campuses: React.PropTypes.array.isRequired,
  dateFormat: React.PropTypes.func,
  maxDate: React.PropTypes.object,
  minDate: React.PropTypes.object,
  onFilterChange: React.PropTypes.func
}
FilterDialog.defaultProps = {
  dateFormat: new window.Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format,
  maxDate: new Date(),
  minDate: new Date()
}
