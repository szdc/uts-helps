import React from 'react'

import Sessions from '../components/Sessions'

import strings from './SessionsContainer.strings'

class SessionsContainer extends React.Component {

  /**
   * Updates the layout.
   */
  componentDidMount() {
    this.props.layout
      .setHeader({
        title: strings.page_title
      })
      .setTitle(strings.page_title)
  }

  /**
   * Renders the login component.
   *
   * @returns {XML}
   */
  render() {
    return (
      <Sessions />
    )
  }
}
SessionsContainer.propTypes = {
  layout: React.PropTypes.object
}

export default SessionsContainer
