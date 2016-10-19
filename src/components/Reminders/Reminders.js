import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {
  Table,
  TableBody,
  TableRow
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import TableCell from './TableCell'
import TableCellIcon from './TableCellIcon'
import TableRowReminder from './TableRowReminder'
import { IconAdd, IconEmail, IconSms } from 'components/Icons'

import classes from './Reminders.scss'
import strings from './Reminders.strings'

export default class Reminders extends React.Component {

  /**
   * Sets up the component.
   */
  constructor(props) {
    super(props)

    this.state = {
      form: {
        figure: '',
        quantifier: 'days',
        type: 'email'
      }
    }
    this._onAddReminderClick = ::this._onAddReminderClick
    this._onSelectFieldChange = ::this._onSelectFieldChange
    this._onSelectTypeChange = ::this._onSelectTypeChange
    this._onTextFieldChange = ::this._onTextFieldChange
  }

  /**
   * Handles a click on the add reminder button.
   */
  _onAddReminderClick() {
    const { form } = this.state
    if (form.figure.length) {
      this.props.onAddReminder(form.figure, form.quantifier, form.type)
      this.setState({
        form: {
          ...this.state.form,
          figure: ''
        }
      })
    }
  }

  /**
   * Stores a change to a text field.
   *
   * @param e
   */
  _onTextFieldChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  /**
   * Stores a change to the quantifier select field.
   *
   * @param e
   * @param i
   * @param value
   */
  _onSelectFieldChange(e, i, value) {
    this.setState({
      form: {
        ...this.state.form,
        quantifier: value
      }
    })
  }

  /**
   * Stores a change to the quantifier select field.
   *
   * @param e
   * @param i
   * @param value
   */
  _onSelectTypeChange(e, i, value) {
    this.setState({
      form: {
        ...this.state.form,
        type: value
      }
    })
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const { error, onDeleteReminder, reminders, startDate } = this.props
    const { form } = this.state

    return (
      <div className={classes.container}>
        {error !== null &&
          <p className={classes.error}>{error}</p>
        }

        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableCell style={{padding: '0 10px 0 0', width: '48px'}}>
                <TextField
                  inputStyle={{textAlign: 'center'}}
                  name='figure'
                  onChange={this._onTextFieldChange}
                  ref='figure'
                  pattern='[0-9]*'
                  style={{width: '100%'}}
                  type='number'
                  value={form.figure}
                />
              </TableCell>
              <TableCell style={{padding: '0 10px 0 0', width: '100px'}}>
                <SelectField
                  autoWidth
                  name='quantifier'
                  onChange={this._onSelectFieldChange}
                  style={{width: '100%', marginRight: '10px'}}
                  value={form.quantifier}
                >
                  <MenuItem value='minutes' primaryText='minutes' />
                  <MenuItem value='hours' primaryText='hours' />
                  <MenuItem value='days' primaryText='days' />
                </SelectField>
              </TableCell>
              <TableCell style={{padding: '0 10px 0 0', width: '55px'}}>
                <SelectField
                  autoWidth
                  className={classes.type}
                  name='type'
                  onChange={this._onSelectTypeChange}
                  style={{padding: '0', width: '100%'}}
                  value={form.type}
                >
                  <MenuItem value='email' primaryText={<IconEmail />} />
                  <MenuItem value='sms' primaryText={<IconSms />} />
                </SelectField>
              </TableCell>
              <TableCellIcon>
                {form.figure.length > 0 &&
                  <IconAdd
                    displayAsButton
                    onTouchTap={this._onAddReminderClick}
                  />
                }
              </TableCellIcon>
            </TableRow>
          </TableBody>
        </Table>

        <div className={classes.reminderSubtext}>
          <span>{strings.reminder_subtext}</span>
        </div>

        {reminders.length > 0 &&
          <Table
            className={classes.reminders}
            selectable={false}
            bodyStyle={{maxHeight: '120px'}}
          >
            <TableBody displayRowCheckbox={false}>
              {reminders.map(reminder => (
                <TableRowReminder
                  key={reminder._id}
                  onDelete={onDeleteReminder}
                  reminder={reminder}
                  startDate={startDate}
                />
              ))}
            </TableBody>
          </Table>
        }
      </div>
    )
  }
}
Reminders.propTypes = {
  error: React.PropTypes.string,
  onAddReminder: React.PropTypes.func,
  onDeleteReminder: React.PropTypes.func,
  reminders: React.PropTypes.arrayOf(React.PropTypes.object),
  startDate: React.PropTypes.string
}
Reminders.defaultProps = {
  onAddReminder: () => {}
}
