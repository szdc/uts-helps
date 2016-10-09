import React from 'react'
import moment from 'moment'
import { TableRow } from 'material-ui/Table'

import TableCell from './TableCell'
import TableCellIcon from './TableCellIcon'
import { IconDelete } from 'components/Icons'

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
    const { reminder, workshop } = this.props
    const timeString = moment.unix(reminder.timestamp).from(moment(workshop.StartDate), true)
    return `${timeString} before`
  }

  /**
   * Renders the component.
   */
  render() {
    return (
      <TableRow displayBorder={false}>
        <TableCell>
          {this._getTimeString()}
        </TableCell>
        <TableCellIcon>
          <IconDelete
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
  workshop: React.PropTypes.object.isRequired
}
TableRowReminder.defaultProps = {
  onDelete: () => {}
}
