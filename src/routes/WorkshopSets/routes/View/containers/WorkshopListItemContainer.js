import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { getDateString, getTimeString } from 'utils/helpers'

import WorkshopListItem from '../components/WorkshopListItem'

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

    const { workshop } = props
    this.bookingDialogConfirm = {
      props: {
        actions: [
          <FlatButton
            label={strings.label_cancel}
            onTouchTap={this._onBookingDialogCancel}
          />,
          <FlatButton
            label='Book'
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
            {strings.text_booking}
          </span>
        </div>
      )
    }
    this.bookingDialogSuccess = {
      props: {
        actions: [
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
          <div>
            <label>Date:</label>
            <span>{getDateString(workshop.StartDate)}</span>
          </div>
          <div>
            <label>Time:</label>
            <span>{getTimeString(workshop.StartDate, workshop.EndDate)}</span>
          </div>
          <hr />
        </div>
      )
    }
  }

  /**
   * Attempts to book the workshop.
   *
   * @param workshop
   * @private
   */
  _onBookWorkshopClick() {
    this.setState({
      dialog: this.bookingDialogSuccess
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
          {...this.props}
        />
      </div>
    )
  }
}
WorkshopListItemContainer.propTypes = {
  workshop: React.PropTypes.object.isRequired
}

export default connect()(WorkshopListItemContainer)
