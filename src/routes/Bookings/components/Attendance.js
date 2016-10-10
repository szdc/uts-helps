import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import Spinner from 'components/Spinner'

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
      formErrors: {},
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
      confirming: false,
      dialog: this.dialogSubmitting,
      formErrors: {},
      submitting: true
    })
    this.props.onSubmit(this.state.form.code, (err) => {
      if (err) {
        this.setState({
          dialog: this.dialogVerify,
          formErrors: {
            code: strings.error_code
          }
        })
      }
    })
  }

  /**
   * Handles a click on record attendance.
   *
   * @private
   */
  _onRecordAttendanceClick() {
    this.setState({
      dialog: this.dialogSubmitting,
      submitting: true
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
      formErrors,
      submitting
    } = this.state

    return (
      <div>
        <RaisedButton
          label={strings.label_record_attendance}
          onClick={this._onRecordAttendanceClick}
          primary
          style={{float: 'right', marginBottom: '10px'}}
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
                errorText={formErrors.code}
                floatingLabelFixed
                floatingLabelText={strings.label_code}
                hintText={strings.hint_code}
                name='code'
                onChange={this._onFieldChanged}
                value={form.code}
              />
            </div>
          }
          {submitting &&
            <div className={classes.progressContainer}>
              <Spinner size='dialog' />
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
