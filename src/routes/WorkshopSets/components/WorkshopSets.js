import React from 'react'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

import WorkshopSetListItem from './WorkshopSetListItem'

import classes from './WorkshopSets.scss'
import strings from './WorkshopSets.strings'

export default class WorkshopSets extends React.Component {

  /**
   * Renders the list of available workshops.
   *
   * @returns {XML}
   */
  render() {
    const { onWorkshopSetClick, workshopSets } = this.props

    return (
      <div className={classes.container}>
        <List>
          <Subheader>{strings.list_title}</Subheader>
          {workshopSets.map(workshopSet => (
            <WorkshopSetListItem
              key={workshopSet.id}
              onClick={onWorkshopSetClick}
              workshopSet={workshopSet}
            />
          ))}
        </List>
      </div>
    )
  }
}
WorkshopSets.propTypes = {
  onWorkshopSetClick: React.PropTypes.func,
  workshopSets: React.PropTypes.array.isRequired
}
WorkshopSets.defaultProps = {
  onWorkshopSetClick: () => {}
}
