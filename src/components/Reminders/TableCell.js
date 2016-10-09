import React from 'react'
import { TableRowColumn } from 'material-ui/Table'

import classes from './Reminders.scss'

const TableCell = (props) => {
  return (
    <TableRowColumn {...props} className={classes.cell}>
      {props.children}
    </TableRowColumn>
  )
}
TableCell.propTypes = {
  children: React.PropTypes.node.isRequired
}

export default TableCell
