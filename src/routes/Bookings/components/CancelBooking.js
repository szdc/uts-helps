import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './CancelBooking.scss'
import strings from './CancelBooking.strings'

export default class CancelBooking extends React.Component {

  /**
   * Records attendance.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      confirming: false,
      dialog: {},
      submitting: false
    }
    this._closeDialog = ::this._closeDialog
    this._onCancelClick = ::this._onCancelClick
    this._onSubmit = ::this._onSubmit

    this.dialogConfirm = {
      props: {
        title: strings.title_confirm,
        titleStyle: {
          paddingBottom: '12px'
        }
      }
    }
    this.dialogSubmitting = {
      props: {
        modal: true,
        bodyStyle: {padding: '12px'}
      }
    }
  }

  /**
   * Closes the dialog.
   *
   * @private
   */
  _closeDialog() {
    this.setState({
      dialog: {},
      confirming: false,
      submitting: false
    })
  }

  /**
   * Cancels the booking.
   *
   * @private
   */
  _onSubmit() {
    this.setState({
      dialog: this.dialogSubmitting,
      confirming: false,
      submitting: true
    })
    this.props.onSubmit()
  }

  /**
   * Handles a click on the cancel button.
   *
   * @private
   */
  _onCancelClick() {
    this.setState({
      dialog: this.dialogConfirm,
      confirming: true
    })
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const {
      confirming,
      dialog,
      submitting
    } = this.state

    return (
      <div>
        <RaisedButton
          label={strings.label_cancel}
          onClick={this._onCancelClick}
          primary
          style={{float: 'right', marginBottom: '10px'}}
        />
        <Dialog
          actions={
            confirming ?
              [
                <FlatButton
                  label={strings.label_close}
                  onTouchTap={this._closeDialog}
                />,
                <FlatButton
                  label={strings.label_confirm}
                  onTouchTap={this._onSubmit}
                  primary
                />
              ] : null
          }
          bodyStyle={{lineHeight: '1.4'}}
          onRequestClose={this._closeDialog}
          open={Object.keys(dialog).length > 0}
          {...dialog.props}
        >
          {confirming &&
            <div>
              <span>{strings.text_confirm}</span>
            </div>
          }
          {submitting &&
            <div className={classes.progressContainer}>
              <CircularProgress
                className={classes.progressIndicator}
                size={'20px'}
                style={{margin: '5px'}}
              />
              <span className={classes.progressText}>
                {strings.text_submitting}
              </span>
            </div>
          }
        </Dialog>
      </div>
    )
  }
}
CancelBooking.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}
