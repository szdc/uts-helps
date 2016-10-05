import React from 'react'
import moment from 'moment'
import { ListItem } from 'material-ui/List'

import classes from './WorkshopListItem.scss'

export default class WorkshopListItem extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onClick = ::this._onClick
  }

  /**
   * Handles a click on the item.
   *
   * @private
   */
  _onClick() {
    const { onClick, workshop } = this.props
    onClick(workshop)
  }

  /**
   * Constructs a date string for display.
   *
   * @param startDate
   * @private
   */
  _getDateString(startDate) {
    return moment(startDate).format('dddd, Do MMMM YYYY')
  }

  /**
   * Constructs a time string for display.
   *
   * @param startDate
   * @param endDate
   * @returns {string}
   * @private
   */
  _getTimeString(startDate, endDate) {
    return moment(startDate).format('h:mma') + ' - ' + moment(endDate).format('h:mma')
  }

  /**
   * Renders the workshop set item.
   *
   * @returns {XML}
   */
  render() {
    const { workshop } = this.props

    return (
      <ListItem
        nestedItems={[
          <div className={classes.moreInfo}>
            <div className={classes.infoLine}>
              <span className={classes.heading}>Places Available:</span>
              <span className={classes.content}>{workshop.maximum - workshop.BookingCount}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>Room:</span>
              <span className={classes.content}>{workshop.campus}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>Target Group:</span>
              <span className={classes.content}>{workshop.targetingGroup}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>What it Covers:</span>
              <span className={classes.content}>{workshop.topic}</span>
            </div>
          </div>
        ]}
        initiallyOpen
        primaryText={workshop.topic}
        primaryTogglesNestedList
        secondaryText={
          <p className={classes.secondaryText}>
            {this._getDateString(workshop.StartDate)}
            <br />
            {this._getTimeString(workshop.StartDate, workshop.EndDate)}
          </p>
        }
        secondaryTextLines={2}
      />
    )
  }
}
WorkshopListItem.propTypes = {
  onClick: React.PropTypes.func,
  workshop: React.PropTypes.object.isRequired
}
