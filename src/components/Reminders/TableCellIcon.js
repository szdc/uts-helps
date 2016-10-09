import React from 'react'
import { TableRowColumn } from 'material-ui/Table'

import classes from './Reminders.scss'

const TableCellIcon = (props) => {
  return (
    <TableRowColumn className={[classes.cell, classes.cellIcon].join(' ')}>
      {props.children}
    </TableRowColumn>
  )
}
TableCellIcon.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default TableCellIcon
