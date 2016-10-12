import React from 'react'

export default class Logout extends React.Component {

  /**
   * Logs the user out.
   */
  componentWillMount() {
    this.props.logout()
  }

  /**
   * Disables rendering of this component.
   *
   * @returns {null}
   */
  render() {
    return null
  }
}
Logout.propTypes = {
  logout: React.PropTypes.func.isRequired,
  navigateTo: React.PropTypes.func.isRequired
}
