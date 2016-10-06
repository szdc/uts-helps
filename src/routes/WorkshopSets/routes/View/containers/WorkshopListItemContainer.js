import React from 'react'
import { connect } from 'react-redux'

import {
  BookingDialog,
  BookingDialogProgress,
  BookingDialogSuccess
} from '../components/BookingDialog'
import WorkshopListItem from '../components/WorkshopListItem'

class WorkshopListItemContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      booking: false,
      confirming: false,
      success: false
    }
    this._onBookingDialogCancel = ::this._onBookingDialogCancel
    this._onBookingDialogConfirm = ::this._onBookingDialogConfirm
    this._onBookingSuccess = ::this._onBookingSuccess
    this._onBookingSuccessClose = ::this._onBookingSuccessClose
    this._onBookWorkshopClick = ::this._onBookWorkshopClick
  }

  /**
   * Attempts to book the workshop.
   *
   * @param workshop
   * @private
   */
  _onBookWorkshopClick(workshop) {
    this.setState({
      confirming: true
    })
  }

  /**
   * Closes the booking dialog.
   *
   * @private
   */
  _onBookingDialogCancel() {
    this.setState({
      confirming: false
    })
  }

  /**
   * Handles a booking dialog confirmation.
   *
   * @private
   */
  _onBookingDialogConfirm() {
    this.setState({
      booking: true,
      confirming: false
    }, () => {
      setTimeout(this._onBookingSuccess, 2000)
    })
  }

  _onBookingSuccess() {
    this.setState({
      booking: false,
      success: true
    })
  }

  _onBookingSuccessClose() {
    this.setState({
      success: false
    })
  }

  /**
   * Renders the workshop list item.
   *
   * @returns {XML}
   */
  render() {
    const { booking, confirming, success } = this.state

    return (
      <div>
        <WorkshopListItem
          onBookClick={this._onBookWorkshopClick}
          {...this.props}
        />
        {confirming &&
          <BookingDialog
            onCancel={this._onBookingDialogCancel}
            onConfirm={this._onBookingDialogConfirm}
          />
        }
        {booking &&
          <BookingDialogProgress />
        }
        {success &&
          <BookingDialogSuccess
            onClose={this._onBookingSuccessClose}
          />
        }
      </div>
    )
  }
}

export default connect()(WorkshopListItemContainer)
