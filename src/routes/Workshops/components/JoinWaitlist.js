import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Spinner from 'components/Spinner'

import classes from './JoinWaitlist.scss'
import strings from './JoinWaitlist.strings'

export default class JoinWaitlist extends React.Component {

  /**
   * Sets up the component.
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
    this._onJoinWaitlistClick = ::this._onJoinWaitlistClick
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
   * Adds the user to the waitlist.
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
   * Handles a click on the join waitlist button.
   *
   * @private
   */
  _onJoinWaitlistClick() {
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
          label={strings.label_join_waitlist}
          onClick={this._onJoinWaitlistClick}
          primary
          style={{float: 'right', marginBottom: '10px'}}
        />
        <Dialog
          actions={
            confirming ?
              [
                (<FlatButton
                  label={strings.label_cancel}
                  onTouchTap={this._closeDialog}
                />),
                (<FlatButton
                  label={strings.label_confirm}
                  onTouchTap={this._onSubmit}
                  primary
                />)
              ] : null
          }
          bodyStyle={{
            lineHeight: '1.4',
            paddingBottom: '0'
          }}
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
JoinWaitlist.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
}
