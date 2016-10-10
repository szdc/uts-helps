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
    this._onFieldChange = ::this._onFieldChange
    this._onSelectCampusChange = ::this._onSelectCampusChange
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
        campusId: payload
      }
    })
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const { campuses } = this.props
    const { form } = this.state

    const inputStyle = {
      width: '100%'
    }

    return (
      <div>
        <DatePicker
          floatingLabelText={strings.hint_start_date}
          floatingLabelFixed
          textFieldStyle={inputStyle}
          style={inputStyle}
        />
        <DatePicker
          floatingLabelText={strings.hint_end_date}
          floatingLabelFixed
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
          hintText={strings.hint_topic}
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
  campuses: React.PropTypes.array.isRequired
}
