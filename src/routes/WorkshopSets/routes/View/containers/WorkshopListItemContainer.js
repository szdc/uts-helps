import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import WorkshopListItem from '../components/WorkshopListItem'

import classes from './BookingDialog.scss'

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
      dialog: {},
      success: false
    }
    this._onBookingDialogCancel = ::this._onBookingDialogCancel
    this._onBookingDialogConfirm = ::this._onBookingDialogConfirm
    this._onBookingSuccess = ::this._onBookingSuccess
    this._onBookWorkshopClick = ::this._onBookWorkshopClick

    this.bookingDialogConfirm = {
      props: {
        actions: [
          <FlatButton
            label='Cancel'
            onTouchTap={this._onBookingDialogCancel}
          />,
          <FlatButton
            label='Book'
            onTouchTap={this._onBookingDialogConfirm}
            primary
          />
        ],
        bodyStyle: {
          lineHeight: '1.4',
          paddingBottom: '0'
        },
        title: 'Confirm booking',
        titleStyle: {
          paddingBottom: '12px'
        }
      },
      content: (
        <span>Are you sure you want to book this session?</span>
      )
    }
    this.bookingDialogBooking = {
      props: {
        modal: true,
        bodyStyle: {padding: '12px'}
      },
      content: (
        <div className={classes.progressContainer}>
          <CircularProgress
            className={classes.progressIndicator}
            size={'20px'}
            style={{margin: '5px'}}
          />
          <span className={classes.progressText}>
            Confirming booking...
          </span>
        </div>
      )
    }
    this.bookingDialogSuccess = {
      props: {
        title: 'Booking Confirmation'
      },
      content: (
        <span>...</span>
      )
    }
  }

  /**
   * Attempts to book the workshop.
   *
   * @param workshop
   * @private
   */
  _onBookWorkshopClick(workshop) {
    this.setState({
      dialog: this.bookingDialogConfirm
    })
  }

  /**
   * Closes the booking dialog.
   *
   * @private
   */
  _onBookingDialogCancel() {
    this.setState({
      dialog: {}
    })
  }

  /**
   * Handles a booking dialog confirmation.
   *
   * @private
   */
  _onBookingDialogConfirm() {
    this.setState({
      dialog: this.bookingDialogBooking
    }, () => {
      setTimeout(this._onBookingSuccess, 2000)
    })
  }

  /**
   * Updates the dialog to show the booking was successful.
   *
   * @private
   */
  _onBookingSuccess() {
    this.setState({
      dialog: this.bookingDialogSuccess
    })
  }

  /**
   * Renders the workshop list item.
   *
   * @returns {XML}
   */
  render() {
    const { dialog } = this.state

    return (
      <div>
        <Dialog
          onRequestClose={this._onBookingDialogCancel}
          open={Object.keys(dialog).length > 0}
          {...dialog.props}
        >
          {dialog.content}
        </Dialog>
        <WorkshopListItem
          onBookClick={this._onBookWorkshopClick}
          {...this.props}
        />

      </div>
    )
  }
}

export default connect()(WorkshopListItemContainer)
