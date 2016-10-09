import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import GenericListItem from 'components/GenericListItem'
import { IconCheck } from 'components/Icons'

import classes from './BookingListItem.scss'
import strings from './BookingListItem.strings'

export default class BookingListItem extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onCancelClick = ::this._onCancelClick
  }

  /**
   * Handles a click on the cancel button.
   *
   * @private
   */
  _onCancelClick() {
    const { onCancelClick, booking } = this.props
    onCancelClick(booking)
  }

  /**
   * Renders the booking item.
   *
   * @returns {XML}
   */
  render() {
    const { booking } = this.props

    return (
      <GenericListItem
        actions={
          booking.isUpcoming &&
            <RaisedButton
              label={strings.label_cancel_booking}
              onClick={this._onCancelClick}
              primary
            />
        }
        additionalText={
          booking.attended !== null &&
            <div className={classes.attended}>
              <IconCheck />
              {strings.text_attended}
            </div>
        }
        campus={booking.campusID}
        description={booking.description}
        endDate={booking.ending}
        startDate={booking.starting}
        targetGroup={booking.targetingGroup}
        topic={booking.topic}
      />
    )
  }
}
BookingListItem.propTypes = {
  booking: React.PropTypes.object.isRequired,
  onCancelClick: React.PropTypes.func
}
BookingListItem.defaultProps = {
  onCancelClick: () => {}
}
