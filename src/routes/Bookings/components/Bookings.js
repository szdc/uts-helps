import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'

import BookingListItem from './BookingListItem'

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
    const { bookings } = this.props

    return (
      <div className={classes.container}>
        <Tabs
          onChange={this._handleChange}
          value={this.state.slideIndex}
        >
          <Tab label={strings.label_upcoming} value={0} />
          <Tab label={strings.label_past} value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this._handleChange}
        >
          <div>
            {bookings.map(booking => (
              <BookingListItem
                booking={booking}
                key={booking.BookingId}
              />
            ))}
          </div>
          <div>
            {bookings.map(booking => (
              <BookingListItem
                booking={booking}
                key={booking.BookingId}
              />
            ))}
          </div>
        </SwipeableViews>
      </div>
    )
  }
}
Bookings.propTypes = {
  bookings: React.PropTypes.array.isRequired
}
