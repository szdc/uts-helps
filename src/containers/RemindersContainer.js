import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

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
      reminders: []
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
    const { workshop } = this.props
    const timestamp = moment(workshop.StartDate).subtract(figure, quantifier).unix()

    if (this.state.reminders.some(reminder => reminder.timestamp === timestamp)) {
      return this.setState({
        error: strings.error_reminder_exists
      })
    }

    this.setState({
      error: null,
      reminders: [
        ...this.state.reminders,
        {
          id: Math.random(),
          timestamp
        }
      ]
    })
  }

  /**
   * Deletes a reminder.
   *
   * @param reminder
   */
  _deleteReminder(reminder) {
    this.setState({
      reminders: this.state.reminders.filter(r => r.id !== reminder.id)
    })
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
  workshop: React.PropTypes.object
}

export default connect()(RemindersContainer)
