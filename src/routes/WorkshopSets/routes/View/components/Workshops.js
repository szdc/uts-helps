import React from 'react'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

import WorkshopListItem from './WorkshopListItem'

import classes from './Workshops.scss'
import strings from './Workshops.strings'

export default class Workshops extends React.Component {

  /**
   * Renders the list of available workshops.
   *
   * @returns {XML}
   */
  render() {
    const { onWorkshopClick, workshops } = this.props

    return (
      <div className={classes.container}>
        <List>
          <Subheader>{strings.list_title}</Subheader>
          {workshops.map(workshop => (
            <WorkshopListItem
              key={workshop.WorkshopId}
              onClick={onWorkshopClick}
              workshop={workshop}
            />
          ))}
        </List>
      </div>
    )
  }
}
Workshops.propTypes = {
  onWorkshopClick: React.PropTypes.func,
  workshops: React.PropTypes.array.isRequired
}
Workshops.defaultProps = {
  onWorkshopClick: () => {}
}
