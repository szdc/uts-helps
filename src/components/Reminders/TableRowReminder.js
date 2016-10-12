import React from 'react'
import moment from 'moment'
import { TableRow } from 'material-ui/Table'

import TableCell from './TableCell'
import TableCellIcon from './TableCellIcon'
import { IconDelete, IconEmail, IconSms } from 'components/Icons'

import classes from './Reminders.scss'

export default class TableRowReminder extends React.Component {
  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onDeleteClick = ::this._onDeleteClick
  }

  /**
   * Handles a click on the delete button.
   */
  _onDeleteClick() {
    this.props.onDelete(this.props.reminder)
  }

  /**
   * Constructs a human readable time string.
   */
  _getTimeString() {
    const { reminder, startDate } = this.props
    const timeString = moment.unix(reminder.timestamp).from(moment(startDate), true)
    return `${timeString} before`
  }

  /**
   * Renders the component.
   */
  render() {
    const { reminder } = this.props

    return (
      <TableRow displayBorder={false}>
        <TableCell>
          {this._getTimeString()}
        </TableCell>
        <TableCellIcon>
          {reminder.email ? <IconEmail displayAsButton /> : <IconSms displayAsButton />}
        </TableCellIcon>
        <TableCellIcon>
          <IconDelete
            className={classes.delete}
            displayAsButton
            onTouchTap={this._onDeleteClick}
          />
        </TableCellIcon>
      </TableRow>
    )
  }
}
TableRowReminder.propTypes = {
  onDelete: React.PropTypes.func,
  reminder: React.PropTypes.object.isRequired,
  startDate: React.PropTypes.string.isRequired
}
TableRowReminder.defaultProps = {
  onDelete: () => {}
}
