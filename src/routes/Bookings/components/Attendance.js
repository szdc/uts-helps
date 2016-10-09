import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import classes from './Attendance.scss'
import strings from './Attendance.strings'

export default class Attendance extends React.Component {

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
      form: {
        code: ''
      },
      submitting: false
    }
    this._closeDialog = ::this._closeDialog
    this._onFieldChanged = ::this._onFieldChanged
    this._onRecordAttendanceClick = ::this._onRecordAttendanceClick
    this._onSubmit = ::this._onSubmit

    this.dialogVerify = {
      props: {
        title: strings.title_verify,
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
   * Verifies attendance.
   *
   * @private
   */
  _onSubmit() {
    this.setState({
      dialog: this.dialogSubmitting,
      confirming: false,
      submitting: true
    })
    this.props.onSubmit(this.state.form.code)
  }

  /**
   * Handles a click on record attendance.
   *
   * @private
   */
  _onRecordAttendanceClick() {
    this.setState({
      dialog: this.dialogVerify,
      confirming: true
    })
  }

  /**
   * Stores a change to a form field.
   *
   * @param e
   * @private
   */
  _onFieldChanged(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value.toUpperCase()
      }
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
      form,
      submitting
    } = this.state

    return (
      <div>
        <RaisedButton
          label={strings.label_record_attendance}
          onClick={this._onRecordAttendanceClick}
          primary
        />
        <Dialog
          actions={
            confirming ?
              [
                <FlatButton
                  label={strings.label_cancel}
                  onTouchTap={this._closeDialog}
                />,
                <FlatButton
                  disabled={form.code.length === 0}
                  label={strings.label_attend}
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
              <span>{strings.text_verify}</span>
              <TextField
                floatingLabelFixed
                floatingLabelText='Code word'
                hintText='ABC123'
                name='code'
                onChange={this._onFieldChanged}
                value={form.code}
              />
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
Attendance.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}
