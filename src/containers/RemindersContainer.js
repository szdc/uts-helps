import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import Reminders from 'components/Reminders'

class RemindersContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
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

    this.setState({
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
