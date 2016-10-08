import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import { IconAdd, IconDelete } from 'components/Icons'

import classes from './Reminders.scss'

export default class Reminders extends React.Component {

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableCell>
                <TextField
                  displayAsButton
                  style={{width: 'auto', marginRight: '15px'}}
                  type='number'
                />
              </TableCell>
              <TableCell>
                <SelectField
                  autoWidth
                  style={{width: '100%'}}
                  value='days'
                >
                  <MenuItem value='mins' primaryText='minutes' />
                  <MenuItem value='hours' primaryText='hours' />
                  <MenuItem value='days' primaryText='days' />
                </SelectField>
              </TableCell>
              <TableCellIcon>
                <IconAdd displayAsButton />
              </TableCellIcon>
            </TableRow>
          </TableBody>
        </Table>

        <Table className={classes.reminders} selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow displayBorder={false}>
              <TableCell>15 mins before</TableCell>
              <TableCellIcon><IconDelete displayAsButton /></TableCellIcon>
            </TableRow>
            <TableRow displayBorder={false}>
              <TableCell>3 days before</TableCell>
              <TableCellIcon><IconDelete displayAsButton /></TableCellIcon>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}
Reminders.propTypes = {

}
Reminders.defaultProps = {

}

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

