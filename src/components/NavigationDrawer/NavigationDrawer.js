import React from 'react'
import Drawer from 'material-ui/Drawer'
import { Link } from 'react-router'

import {
  IconAddUser,
  IconLeaderboard,
  IconLogout,
  IconSettings
} from 'components/Icons'

import strings from './NavigationDrawer.strings'
import classes from './NavigationDrawer.scss'

export default class NavigationDrawer extends React.Component {

  /**
   * Renders the drawer.
   *
   * @returns {XML}
   */
  render() {
    const { profile, width } = this.props

    return (
      <Drawer
        docked={false}
        width={width}
        open={this.props.open}
        onRequestChange={this.props.onChange}
      >
        <div className={classes.user}>
          <div className={classes.sectionLogo} />
          <div className={classes.userInfo}>
            <span className={classes.username}>{profile.name}</span>
          </div>
        </div>
        <div className={classes.menu}>
          <ul>
            <li>
              <Link to='/logout' className={classes.link} onClick={this.close}>
                <IconLogout />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_logout}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    )
  }
}
NavigationDrawer.propTypes = {
  open: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  profile: React.PropTypes.object,
  user: React.PropTypes.object,
  width: React.PropTypes.number
}
NavigationDrawer.defaultProps = {
  width: 250
}
