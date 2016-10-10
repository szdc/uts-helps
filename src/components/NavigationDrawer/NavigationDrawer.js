import React from 'react'
import Drawer from 'material-ui/Drawer'
import { Link } from 'react-router'

import {
  IconDate,
  IconLogout,
  IconProfile,
  IconProgram,
  IconSession,
  IconWorkshop
} from 'components/Icons'

import strings from './NavigationDrawer.strings'
import classes from './NavigationDrawer.scss'

export default class NavigationDrawer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.close = ::this.close
  }

  /**
   * Closes the navigation drawer.
   */
  close() {
    this.props.onChange(false)
  }

  /**
   * Renders the drawer.
   *
   * @returns {XML}
   */
  render() {
    const { profile, width } = this.props
    const userStyle = {
      backgroundColor: this.context.muiTheme.palette.accent2Color
    }

    return (
      <Drawer
        docked={false}
        width={width}
        open={this.props.open}
        onRequestChange={this.props.onChange}
      >
        <div className={classes.user} style={userStyle}>
          <div className={classes.sectionLogo} />
          <div className={classes.userInfo}>
            <span className={classes.username}>{profile.preferred_name || profile.studentID}</span>
          </div>
        </div>
        <div className={classes.menu}>
          <ul>
            <li>
              <NavigationLink onClick={this.close} to='/bookings'>
                <IconDate />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_bookings}
                </span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink onClick={this.close} to='/profile'>
                <IconProfile />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_profile}
                </span>
              </NavigationLink>
            </li>
            <hr className={classes.divider} />
            <li>
              <NavigationLink onClick={this.close} to='/workshop-sets'>
                <IconWorkshop />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_workshops}
                </span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink onClick={this.close} to='/sessions'>
                <IconSession />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_sessions}
                </span>
              </NavigationLink>
            </li>
            <li>
              <NavigationLink onClick={this.close} to='/programs'>
                <IconProgram />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_programs}
                </span>
              </NavigationLink>
            </li>
            <li>
              <hr className={classes.divider} />
            </li>
            <li>
              <NavigationLink onClick={this.close} to='/logout'>
                <IconLogout />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_logout}
                </span>
              </NavigationLink>
            </li>
          </ul>
        </div>
      </Drawer>
    )
  }
}
NavigationDrawer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
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

class NavigationLink extends React.Component {

  /**
   * Renders the link.
   */
  render() {
    const { children, onClick, to } = this.props
    const linkStyle = {
      color: this.context.muiTheme.palette.primary1Color
    }

    return (
      <Link
        className={classes.link}
        onTouchTap={onClick}
        style={linkStyle}
        to={to}
      >
        {children}
      </Link>
    )
  }
}
NavigationLink.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
NavigationLink.propTypes = {
  children: React.PropTypes.node,
  onClick: React.PropTypes.func.isRequired,
  to: React.PropTypes.string.isRequired
}
