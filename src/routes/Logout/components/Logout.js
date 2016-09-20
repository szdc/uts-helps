import React from 'react'

export default class Logout extends React.Component {
  componentWillMount() {
    const { logout, navigateTo } = this.props
    logout()
  }

  render() {
    return null
  }
}
Logout.propTypes = {
  logout: React.PropTypes.func.isRequired,
  navigateTo: React.PropTypes.func.isRequired
}
