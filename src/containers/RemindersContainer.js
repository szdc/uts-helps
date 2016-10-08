import React from 'react'
import { connect } from 'react-redux'

import Reminders from 'components/Reminders'

class RemindersContainer extends React.Component {

  /**
   * Renders the reminders component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Reminders />
    )
  }
}

export default connect()(RemindersContainer)
