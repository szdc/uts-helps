import React from 'react'
import { connect } from 'react-redux'
import { fetchUserProfile } from 'store/profile/actions'

import NavigationDrawer from 'components/NavigationDrawer'

class NavigationDrawerContainer extends React.Component {

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { fetchUserProfile, profile } = this.props
    if (!profile.loading && !profile.profile) {
      fetchUserProfile()
    }
  }

  /**
   * Renders the Navigation Drawer.
   * 
   * @returns {*}
   */
  render() {
    const { profile } = this.props

    if (profile.loading || !profile.profile) {
      return null
    }

    return (
      <NavigationDrawer
        {...this.props}
        profile={profile.profile}
      />
    )
  }
}
NavigationDrawerContainer.propTypes = {
  fetchUserProfile: React.PropTypes.func.isRequired,
  profile: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = {
  fetchUserProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerContainer)
