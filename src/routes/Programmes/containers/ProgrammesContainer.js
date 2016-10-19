import React from 'react'

import Programmes from '../components/Programmes'

import strings from './ProgrammesContainer.strings'

class ProgrammesContainer extends React.Component {

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
      <Programmes />
    )
  }
}
ProgrammesContainer.propTypes = {
  layout: React.PropTypes.object
}

export default ProgrammesContainer
