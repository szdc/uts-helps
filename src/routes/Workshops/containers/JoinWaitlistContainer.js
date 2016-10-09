import React from 'react'
import { connect } from 'react-redux'

import JoinWaitlist from '../components/JoinWaitlist'
import { createWaitlistBooking } from 'store/bookings/actions/waitlist'

class JoinWaitlistContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onJoinWaitlist = ::this._onJoinWaitlist
  }

  /**
   * Attempts to add the user to the workshop's waitlist.
   *
   * @private
   */
  _onJoinWaitlist() {
    const { createWaitlistBooking, workshop } = this.props
    createWaitlistBooking(workshop.WorkshopId, (err) => {
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
      <JoinWaitlist
        onSubmit={this._onJoinWaitlist}
        {...this.props}
      />
    )
  }
}
JoinWaitlistContainer.propTypes = {
  createWaitlistBooking: React.PropTypes.func.isRequired,
  workshop: React.PropTypes.object.isRequired
}

const mapDispatchToProps = {
  createWaitlistBooking
}

export default connect(null, mapDispatchToProps)(JoinWaitlistContainer)
