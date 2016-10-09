import React from 'react'
import { connect } from 'react-redux'

import Attendance from '../components/Attendance'
import { attendBooking } from 'store/bookings/actions/attend'

class AttendanceContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onVerifyAttendance = ::this._onVerifyAttendance
  }

  /**
   * Attempts to verify the user's attendance.
   *
   * @param code
   * @private
   */
  _onVerifyAttendance(code) {
    const { attendBooking, booking } = this.props
    attendBooking(code, booking.workshopID, (err) => {
      if (err) {
        return console.log(err)
      }
    })
  }

  /**
   * Renders the attendance component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Attendance
        onSubmit={this._onVerifyAttendance}
        {...this.props}
      />
    )
  }
}
AttendanceContainer.propTypes = {
  attendBooking: React.PropTypes.func.isRequired,
  booking: React.PropTypes.object.isRequired
}

const mapDispatchToProps = {
  attendBooking
}

export default connect(null, mapDispatchToProps)(AttendanceContainer)
