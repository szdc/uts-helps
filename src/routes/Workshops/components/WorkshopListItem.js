import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import GenericListItem from 'components/GenericListItem'
import JoinWaitlist from '../containers/JoinWaitlistContainer'
import { IconCheck } from 'components/Icons'

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
    this._onBookClick = ::this._onBookClick
    this._onCancelClick = ::this._onCancelClick
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
   * Handles a click on the book session button.
   *
   * @private
   */
  _onBookClick() {
    const { onBookClick, workshop } = this.props
    onBookClick(workshop)
  }

  /**
   * Handles a click on the cancel session button.
   *
   * @private
   */
  _onCancelClick() {
    const { onCancelClick, workshop } = this.props
    onCancelClick(workshop)
  }

  /**
   * Renders the workshop set item.
   *
   * @returns {XML}
   */
  render() {
    const { workshop } = this.props

    return (
      <GenericListItem
        actions={
          <div>
            {workshop.isBookable &&
              <RaisedButton
                label={strings.label_book_workshop}
                onClick={this._onBookClick}
                primary
              />
            }
            {workshop.isBooked &&
              <RaisedButton
                label={strings.label_cancel_workshop}
                onClick={this._onCancelClick}
                primary
              />
            }
            {workshop.isWaitlistable &&
              <JoinWaitlist
                workshop={workshop}
              />
            }
          </div>
        }
        additionalText={
          <div className={classes.right}>
            {workshop.bookingId !== null ?
              <div className={classes.hasBooking}>
                <IconCheck />
                {strings.text_has_booking}
              </div>
              :
              workshop.isWaitlistable &&
                <div className={classes.capacityReached}>
                  {strings.text_capacity_reached}
                </div>
            }
            {workshop.isWaitlisted &&
              <div className={classes.hasBooking}>
                <IconCheck />
                {strings.text_is_waitlisted}
              </div>
            }
          </div>
        }
        campus={workshop.campus}
        cutoffReached={workshop.cutoffReached}
        description={workshop.description}
        endDate={workshop.EndDate}
        isWaitlistable={workshop.isWaitlistable}
        isWaitlisted={workshop.isWaitlisted}
        remaining={workshop.remaining}
        startDate={workshop.StartDate}
        targetGroup={workshop.targetingGroup}
        topic={workshop.topic}
        waitlistSize={workshop.waitlistSize}
      />
    )
  }
}
WorkshopListItem.propTypes = {
  onBookClick: React.PropTypes.func,
  onCancelClick: React.PropTypes.func,
  onClick: React.PropTypes.func,
  workshop: React.PropTypes.object.isRequired
}
WorkshopListItem.defaultProps = {
  onBookClick: () => {},
  onCancelClick: () => {},
  onClick: () => {}
}
