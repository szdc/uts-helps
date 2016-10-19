import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'

import BookingsTab from './BookingsTab'
import HelpOverlay from './HelpOverlay'

import classes from './Bookings.scss'
import strings from './Bookings.strings'

export default class Bookings extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this.state = {
      slideIndex: 0
    }
    this._handleChange = ::this._handleChange
  }

  /**
   * Handles a change to the tab index.
   *
   * @param value
   */
  _handleChange(value) {
    this.setState({
      slideIndex: value
    })
  }

  /**
   * Renders the booking component.
   */
  render() {
    const { future, onFindWorkshopClick, past } = this.props
    const tabStyle = {
      backgroundColor: this.context.muiTheme.palette.accent2Color,
      color: this.context.muiTheme.palette.primary1Color
    }

    return (
      <div className={classes.container}>
        <Tabs
          inkBarStyle={{backgroundColor: this.context.muiTheme.palette.primary1Color}}
          onChange={this._handleChange}
          value={this.state.slideIndex}
        >
          <Tab
            label={strings.label_future}
            style={tabStyle}
            value={0}
          />
          <Tab
            label={strings.label_past}
            style={tabStyle}
            value={1}
          />
        </Tabs>
        <SwipeableViews
          containerStyle={{height: '100%'}}
          slideStyle={{height: '100%'}}
          style={{height: 'calc(100% - 48px)'}}
          index={this.state.slideIndex}
          onChangeIndex={this._handleChange}
        >
          <BookingsTab
            bookings={future}
            messageNoBookings={strings.message_no_future_bookings}
            onFindWorkshopClick={onFindWorkshopClick}
          />
          <BookingsTab
            bookings={past}
            messageNoBookings={strings.message_no_past_bookings}
            onFindWorkshopClick={onFindWorkshopClick}
          />
        </SwipeableViews>
        {this.props.showHelp &&
          <HelpOverlay
            onClose={this.props.onHelpClose}
          />
        }
      </div>
    )
  }
}
Bookings.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
Bookings.propTypes = {
  bookings: React.PropTypes.array.isRequired,
  future: React.PropTypes.array.isRequired,
  onFindWorkshopClick: React.PropTypes.func,
  onHelpClose: React.PropTypes.func,
  past: React.PropTypes.array.isRequired,
  showHelp: React.PropTypes.bool
}
Bookings.defaultProps = {
  onFindWorkshopClick: () => {},
  showHelp: false
}
