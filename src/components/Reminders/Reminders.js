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
import { IconAdd } from 'components/Icons'

import classes from './Reminders.scss'

export default class Reminders extends React.Component {

  /**
   * Sets up the component.
   */
  constructor(props) {
    super(props)
    this._onAddReminderClick = ::this._onAddReminderClick
    this._onSelectFieldChange = ::this._onSelectFieldChange
    this._onTextFieldChange = ::this._onTextFieldChange
    this.state = {
      form: {
        figure: '',
        quantifier: 'days'
      }
    }
  }

  /**
   * Handles a click on the add reminder button.
   */
  _onAddReminderClick() {
    const { form } = this.state
    if (form.figure.length) {
      this.props.onAddReminder(form.figure, form.quantifier)
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
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const { onDeleteReminder, reminders, workshop } = this.props
    const { form } = this.state

    return (
      <div>
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableCell>
                <TextField
                  name='figure'
                  onChange={this._onTextFieldChange}
                  ref='figure'
                  style={{width: 'auto', marginRight: '15px'}}
                  type='number'
                  value={form.figure}
                />
              </TableCell>
              <TableCell>
                <SelectField
                  autoWidth
                  name='quantifier'
                  onChange={this._onSelectFieldChange}
                  style={{width: '100%'}}
                  value={form.quantifier}
                >
                  <MenuItem value='minutes' primaryText='minutes' />
                  <MenuItem value='hours' primaryText='hours' />
                  <MenuItem value='days' primaryText='days' />
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

        {reminders.length > 0 &&
          <Table className={classes.reminders} selectable={false}>
            <TableBody displayRowCheckbox={false}>
              {reminders.map(reminder => (
                <TableRowReminder
                  key={reminder.id}
                  onDelete={onDeleteReminder}
                  reminder={reminder}
                  workshop={workshop}
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
  onAddReminder: React.PropTypes.func,
  onDeleteReminder: React.PropTypes.func,
  reminders: React.PropTypes.arrayOf(React.PropTypes.object),
  workshop: React.PropTypes.object
}
Reminders.defaultProps = {
  onAddReminder: () => {}
}
