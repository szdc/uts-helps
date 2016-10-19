import React from 'react'

import Attendance from '../containers/AttendanceContainer'
import CancelBooking from '../containers/CancelBookingContainer'
import GenericListItem from 'components/GenericListItem'
import Reminders from 'components/ReminderDialog'
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

    this.state = {
      reminderDialogOpen: true
    }
    this._onReminderDialogChanged = ::this._onReminderDialogChanged
    this._onCancelClick = ::this._onCancelClick
  }

  /**
   * Does not update if the reminders have changed.
   *
   * @param nextProps
   * @param nextState
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.state.reminderDialogOpen === true && nextState.reminderDialogOpen === true)
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

  _onReminderDialogChanged(open) {
    this.setState({
      reminderDialogOpen: open
    })
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
          <div>
            {booking.attended === null && (booking.isInProgress || booking.isUpcoming) &&
              <Attendance
                booking={booking}
                onDialogOpen={this._onAttendanceDialogOpened}
              />
            }
            {booking.isUpcoming && !booking.isInProgress && booking.attended === null &&
              <CancelBooking
                booking={booking}
              />
            }
            {booking.isUpcoming && !booking.isInProgress &&
              <Reminders
                campus={booking.campus}
                onDialogChanged={this._onReminderDialogChanged}
                reminders={booking.reminders}
                startDate={booking.starting}
                topic={booking.topic}
                workshopId={booking.workshopID}
              />
            }
          </div>
        }
        additionalText={
          booking.attended !== null &&
            <div className={classes.attended}>
              <IconCheck />
              {strings.text_attended}
            </div>
        }
        campus={booking.campus}
        description={booking.description}
        duration={booking.duration}
        endDate={booking.ending}
        startDate={booking.starting}
        targetGroup={booking.targetingGroup}
        topic={booking.topic}
        type={booking.type}
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
