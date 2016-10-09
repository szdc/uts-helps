import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import GenericListItem from 'components/GenericListItem'
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
   * Calculates the remaining capacity for the workshop.
   *
   * @returns {number}
   * @private
   */
  _getRemainingCapacity() {
    const { workshop } = this.props
    return Math.max(workshop.maximum - workshop.BookingCount, 0)
  }

  /**
   * Renders the workshop set item.
   *
   * @returns {XML}
   */
  render() {
    const { workshop } = this.props
    console.log(workshop)

    return (
      <GenericListItem
        actions={
          <RaisedButton
            label={workshop.bookingId ? strings.label_cancel_workshop : strings.label_book_workshop}
            onClick={workshop.bookingId ? this._onCancelClick : this._onBookClick}
            primary
          />
        }
        additionalText={
          workshop.bookingId !== null &&
            <div className={classes.hasBooking}>
              <IconCheck />
              {strings.text_has_booking}
            </div>
        }
        campus={workshop.campus}
        capacity={workshop.maximum}
        description={workshop.description}
        endDate={workshop.EndDate}
        remainingCapacity={this._getRemainingCapacity()}
        startDate={workshop.StartDate}
        targetGroup={workshop.targetingGroup}
        topic={workshop.topic}
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
