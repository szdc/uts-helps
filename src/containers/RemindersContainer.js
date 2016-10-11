import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { createReminder } from 'store/reminders/actions/create'
import { deleteReminder } from 'store/reminders/actions/delete'
import Reminders from 'components/Reminders'

import strings from './RemindersContainer.strings'

class RemindersContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      reminders: props.reminders
    }
    this._addReminder = ::this._addReminder
    this._deleteReminder = ::this._deleteReminder
  }

  /**
   * Adds a reminder.
   *
   * @param figure
   * @param quantifier
   */
  _addReminder(figure, quantifier) {
    const {
      campus,
      startDate,
      topic,
      workshopId
    } = this.props
    const timestamp = moment(startDate).subtract(figure, quantifier).unix()

    if (this.state.reminders.some(reminder => reminder.timestamp === timestamp)) {
      return this.setState({
        error: strings.error_reminder_exists
      })
    }

    this.props.createReminder({
      workshopId,
      timestamp: timestamp,
      topic,
      date: startDate,
      location: campus,
      email: 'jack.lives-here@hotmail.com'
    }, (err, res) => {
      if (err) {
        return this.setState({
          error: strings.error_reminder_failed
        })
      }
      this.setState({
        error: null
      })
    })
  }

  /**
   * Deletes a reminder.
   *
   * @param reminder
   */
  _deleteReminder(reminder) {
    this.props.deleteReminder(reminder._id)
  }

  /**
   * Renders the reminders component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Reminders
        error={this.state.error}
        onAddReminder={this._addReminder}
        onDeleteReminder={this._deleteReminder}
        reminders={this.state.reminders}
        {...this.props}
      />
    )
  }
}
RemindersContainer.propTypes = {
  campus: React.PropTypes.string,
  createReminder: React.PropTypes.func,
  deleteReminder: React.PropTypes.func,
  reminders: React.PropTypes.arrayOf(React.PropTypes.object),
  startDate: React.PropTypes.string,
  topic: React.PropTypes.string,
  workshopId: React.PropTypes.any
}
RemindersContainer.defaultProps = {
  reminders: []
}

const mapDispatchToProps = {
  createReminder,
  deleteReminder
}

export default connect(null, mapDispatchToProps)(RemindersContainer)
