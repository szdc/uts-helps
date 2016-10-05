import React from 'react'
import moment from 'moment'
import { ListItem } from 'material-ui/List'

import classes from './WorkshopListItem.scss'
import strings from './WorkshopListItem.strings'

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
    return moment(startDate).format(strings.format_date)
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
    const timeFormat = strings.format_time
    const start = moment(startDate).format(timeFormat)
    const end = moment(endDate).format(timeFormat)
    return strings.format_time_string.replace('{0}', start).replace('{1}', end)
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
              <span className={classes.heading}>{strings.label_available}</span>
              <span className={classes.content}>{workshop.maximum - workshop.BookingCount}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>{strings.label_campus}</span>
              <span className={classes.content}>{workshop.campus}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>{strings.label_target_group}</span>
              <span className={classes.content}>{workshop.targetingGroup}</span>
            </div>
            <div className={classes.infoLine}>
              <span className={classes.heading}>{strings.label_topic}</span>
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
