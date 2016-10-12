import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Reminders from 'containers/RemindersContainer'

import strings from './ReminderDialog.strings'

export default class ReminderDialog extends React.Component {

  /**
   * Records attendance.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    this._closeDialog = ::this._closeDialog
    this._openDialog = ::this._openDialog
  }

  /**
   * Closes the dialog.
   *
   * @private
   */
  _closeDialog() {
    this.setState({
      open: false
    })
  }

  /**
   * Opens the dialog.
   *
   * @private
   */
  _openDialog() {
    this.setState({
      open: true
    })
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const { open } = this.state

    return (
      <div>
        <RaisedButton
          label={strings.label_edit_reminders}
          onClick={this._openDialog}
          primary
          style={{float: 'right', marginBottom: '10px'}}
        />
        <Dialog
          actions={
            <FlatButton
              label={strings.label_close}
              onTouchTap={this._closeDialog}
            />
          }
          bodyStyle={{lineHeight: '1.4', paddingBottom: '0'}}
          onRequestClose={this._closeDialog}
          open={open}
          repositionOnUpdate={false}
          title={strings.title}
          titleStyle={{
            paddingBottom: '12px'
          }}
        >
          <Reminders
            {...this.props}
          />
        </Dialog>
      </div>
    )
  }
}
ReminderDialog.propTypes = {
  campus: React.PropTypes.string,
  startDate: React.PropTypes.string,
  topic: React.PropTypes.string,
  workshopId: React.PropTypes.any
}
