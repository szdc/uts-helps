import React from 'react'
import Divider from 'material-ui/Divider'
import moment from 'moment'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

import CenterLayout from 'layouts/CenterLayout'
import WorkshopListItem from '../containers/WorkshopListItemContainer'

import classes from './Workshops.scss'
import strings from './Workshops.strings'

export default class Workshops extends React.Component {

  /**
   * Gets a string representation of the active filters.
   *
   * @returns {XML}
   * @private
   */
  _getFilterString() {
    const { startDate, endDate, campus } = this.props.filter
    if (Object.keys(this.props.filter).length === 0) {
      return null
    }
    return (
      <p className={classes.filters}>
        {startDate &&
          <span>
            <span className={classes.bold}>Start date:</span>
            {`On or after ${moment(startDate).format('DD/MM/YYYY')}`}
          </span>
        }
        {endDate &&
          <span>
            <span className={classes.bold}>End date:</span>
            {`On or after ${moment(endDate).format('DD/MM/YYYY')}`}
          </span>
        }
        {campus &&
          <span>
            <span className={classes.bold}>Location:</span>
            {campus.campus}
          </span>
        }
      </p>
    )
  }

  /**
   * Renders the list of available workshops.
   *
   * @returns {XML}
   */
  render() {
    const { onWorkshopClick, workshops, workshopSet } = this.props
    const subheaderStyle = {
      lineHeight: '1.5',
      paddingBottom: '15px',
      paddingTop: '15px'
    }

    return (
      <div className={classes.container}>
        <List style={{height: '100%'}}>
          <Subheader style={subheaderStyle}>
            <span className={classes.bold}>
              {strings.list_title}
            </span>
            {workshopSet.name}
            {this._getFilterString()}
          </Subheader>
          <Divider style={{backgroundColor: '#eee'}} />
          {workshops.length
            ?
            workshops.map(workshop => (
              <WorkshopListItem
                key={workshop.WorkshopId}
                onClick={onWorkshopClick}
                workshop={workshop}
              />
            ))
            :
            <div className={classes.noResultsContainer}>
              <CenterLayout>
                <p className={classes.noResultsMessage}>{strings.text_no_results}</p>
              </CenterLayout>
            </div>
          }
        </List>
      </div>
    )
  }
}
Workshops.propTypes = {
  filter: React.PropTypes.object,
  onWorkshopClick: React.PropTypes.func,
  workshops: React.PropTypes.array.isRequired,
  workshopSet: React.PropTypes.object
}
Workshops.defaultProps = {
  filter: {},
  onWorkshopClick: () => {},
  workshopSet: {}
}
