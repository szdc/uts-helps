import React from 'react'
import { List } from 'material-ui/List'

import WorkshopSetListItem from './WorkshopSetListItem'

import classes from './WorkshopSets.scss'

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
