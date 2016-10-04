import React from 'react'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import { Link } from 'react-router'

import {
  IconDate,
  IconLogout,
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
            <span className={classes.username}>{profile.preferred_name || profile.studentID}</span>
          </div>
        </div>
        <div className={classes.menu}>
          <ul>
            <li>
              <Link to='/bookings' className={classes.link} onClick={this.close}>
                <IconDate />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_bookings}
                </span>
              </Link>
            </li>
            <li>
              <Link to='/workshop-sets' className={classes.link} onClick={this.close}>
                <IconWorkshop />
                <span onClick={this.close} className={classes.text}>
                  {strings.label_workshops}
                </span>
              </Link>
            </li>
            <li>
              <Divider />
            </li>
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
