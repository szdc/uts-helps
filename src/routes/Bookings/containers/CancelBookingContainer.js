import React from 'react'
import { connect } from 'react-redux'

import CancelBooking from '../components/CancelBooking'
import { cancelBooking } from 'store/bookings/actions/cancel'

class CancelBookingContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onCancelBooking = ::this._onCancelBooking
  }

  /**
   * Attempts to cancel the user's booking.
   *
   * @private
   */
  _onCancelBooking() {
    const { cancelBooking, booking } = this.props
    cancelBooking(booking.workshopID, (err) => {
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
      <CancelBooking
        onSubmit={this._onCancelBooking}
        {...this.props}
      />
    )
  }
}
CancelBookingContainer.propTypes = {
  cancelBooking: React.PropTypes.func.isRequired,
  booking: React.PropTypes.object.isRequired
}

const mapDispatchToProps = {
  cancelBooking
}

export default connect(null, mapDispatchToProps)(CancelBookingContainer)
