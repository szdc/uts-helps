import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import classes from './BookingDialog.scss'

export class BookingDialog extends React.Component {

  /**
   * Renders the booking dialog.
   *
   * @returns {XML}
   */
  render() {
    const {
      onCancel,
      onConfirm
    } = this.props

    const actions = [
      <FlatButton
        label='Cancel'
        onTouchTap={onCancel}
      />,
      <FlatButton
        label='Book'
        onTouchTap={onConfirm}
        primary
      />
    ]

    return (
      <Dialog
        actions={actions}
        bodyStyle={{
          lineHeight: '1.4',
          paddingBottom: '0'
        }}
        modal={false}
        onRequestClose={onCancel}
        open
        title='Confirm booking'
        titleStyle={{
          paddingBottom: '12px'
        }}
      >
        Are you sure you want to book this session?
      </Dialog>
    )
  }
}
BookingDialog.propTypes = {
  booking: React.PropTypes.bool,
  onCancel: React.PropTypes.bool,
  onConfirm: React.PropTypes.bool
}
BookingDialog.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {}
}

export const BookingDialogProgress = ({open}) => (
  <Dialog
    modal
    open={open}
    bodyStyle={{padding: '12px'}}
  >
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
  </Dialog>
)
BookingDialogProgress.propTypes = {
  open: React.PropTypes.bool
}
BookingDialogProgress.defaultProps = {
  open: true
}

export const BookingDialogSuccess = ({onClose, open}) => (
  <Dialog
    onRequestClose={onClose}
    open={open}
    title='Booking Confirmation'
  >
    ...
  </Dialog>
)
BookingDialogSuccess.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool
}
BookingDialogSuccess.defaultProps = {
  open: true
}
