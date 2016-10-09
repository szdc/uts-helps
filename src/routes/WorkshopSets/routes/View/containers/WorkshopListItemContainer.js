import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Reminders from 'containers/RemindersContainer'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WorkshopListItem from '../components/WorkshopListItem'
import { createBooking } from 'store/bookings/actions/create'
import { cancelBooking } from 'store/bookings/actions/cancel'
import { getDateString, getTimeString } from 'utils/helpers'

import classes from './BookingDialog.scss'
import strings from './BookingDialog.strings'

class WorkshopListItemContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      dialog: {}
    }
    this._onBookingDialogCancel = ::this._onBookingDialogCancel
    this._onBookingDialogConfirm = ::this._onBookingDialogConfirm
    this._onBookingSuccess = ::this._onBookingSuccess
    this._onBookWorkshopClick = ::this._onBookWorkshopClick
    this._onCancelBookingClick = ::this._onCancelBookingClick
    this._onCancelDialogConfirm = ::this._onCancelDialogConfirm
    this._onViewMyBookingsClick = ::this._onViewMyBookingsClick

    const { workshop } = props
    this.bookingDialogConfirm = {
      props: {
        actions: [
          <FlatButton
            label={strings.label_cancel}
            onTouchTap={this._onBookingDialogCancel}
          />,
          <FlatButton
            label={strings.label_book}
            onTouchTap={this._onBookingDialogConfirm}
            primary
          />
        ],
        title: strings.title_confirm,
        titleStyle: {
          paddingBottom: '12px'
        }
      },
      content: <span>{strings.text_confirm}</span>
    }
    this.bookingDialogProcessing = {
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
            {strings.text_booking}
          </span>
        </div>
      )
    }
    this.bookingDialogSuccess = {
      props: {
        actions: [
          <FlatButton
            label={strings.label_my_bookings}
            onTouchTap={this._onViewMyBookingsClick}
            primary
          />,
          <FlatButton
            label={strings.label_close}
            onTouchTap={this._onBookingDialogCancel}
          />
        ],
        title: strings.title_success
      },
      content: (
        <div className={classes.bookingContent}>
          <span className={classes.title}>{workshop.topic}</span>
          <table>
            <tbody>
              <tr>
                <td><label>Date:</label></td>
                <td><span>{getDateString(workshop.StartDate)}</span></td>
              </tr>
              <tr>
                <td><label>Time:</label></td>
                <td><span>{getTimeString(workshop.StartDate, workshop.EndDate)}</span></td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div>
            <label>Reminders:</label>
            <Reminders
              workshop={workshop}
            />
          </div>
        </div>
      )
    }
    this.cancelDialogConfirm = {
      props: {
        actions: [
          <FlatButton
            label={strings.label_cancel}
            onTouchTap={this._onBookingDialogCancel}
          />,
          <FlatButton
            label={strings.label_confirm_cancel}
            onTouchTap={this._onCancelDialogConfirm}
            primary
          />
        ],
        title: strings.title_confirm_cancel,
        titleStyle: {
          paddingBottom: '12px'
        }
      },
      content: <span>{strings.text_confirm_cancel}</span>
    }
    this.cancelDialogProcessing = {
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
            {strings.text_cancelling}
          </span>
        </div>
      )
    }
  }

  /**
   * Shows the book workshop confirmation dialog.
   *
   * @private
   */
  _onBookWorkshopClick() {
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
    const { workshop, createBooking } = this.props
    this.setState({
      dialog: this.bookingDialogProcessing
    })
    createBooking(workshop.WorkshopId, (err, res) => {
      if (err) {
        return console.log(err)
      }
      this.setState({
        dialog: this.bookingDialogSuccess
      })
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
   * Navigates to the booking screen.
   */
  _onViewMyBookingsClick() {
    this.props.push('/bookings')
  }

  /**
   * Shows the cancel booking confirmation dialog.
   *
   * @private
   */
  _onCancelBookingClick() {
    this.setState({
      dialog: this.cancelDialogConfirm
    })
  }

  /**
   * Handles a cancel dialog confirmation.
   *
   * @private
   */
  _onCancelDialogConfirm() {
    const { workshop, cancelBooking } = this.props
    this.setState({
      dialog: this.cancelDialogProcessing
    })
    cancelBooking(workshop.WorkshopId, (err, res) => {
      if (err) {
        return console.log(err)
      }
      this.setState({
        dialog: {}
      })
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
          autoDetectWindowHeight={false}
          bodyStyle={{
            lineHeight: '1.4',
            paddingBottom: '0'
          }}
          className={classes.dialog}
          onRequestClose={this._onBookingDialogCancel}
          open={Object.keys(dialog).length > 0}
          {...dialog.props}
        >
          {dialog.content}
        </Dialog>
        <WorkshopListItem
          onBookClick={this._onBookWorkshopClick}
          onCancelClick={this._onCancelBookingClick}
          {...this.props}
        />
      </div>
    )
  }
}
WorkshopListItemContainer.propTypes = {
  cancelBooking: React.PropTypes.func.isRequired,
  createBooking: React.PropTypes.func.isRequired,
  push: React.PropTypes.func.isRequired,
  workshop: React.PropTypes.object.isRequired
}

const mapDispatchToProps = {
  cancelBooking,
  createBooking,
  push
}

export default connect(null, mapDispatchToProps)(WorkshopListItemContainer)
