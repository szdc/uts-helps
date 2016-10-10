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
   * @param callback
   * @private
   */
  _onVerifyAttendance(code, callback) {
    const { attendBooking, booking, validCodes } = this.props

    if (validCodes.indexOf(code) === -1) {
      return setTimeout(() => callback('Invalid code'), 1000)
    }

    attendBooking(code, booking.workshopID, (err) => {
      if (err) {
        return callback(err)
      }
      callback()
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
  booking: React.PropTypes.object.isRequired,
  validCodes: React.PropTypes.arrayOf(React.PropTypes.string)
}
AttendanceContainer.defaultProps = {
  validCodes: [
    'SDP2016',
    'CGH443',
    'HJH211',
    'J54R4G',
    'SDP123'
  ]
}

const mapDispatchToProps = {
  attendBooking
}

export default connect(null, mapDispatchToProps)(AttendanceContainer)
