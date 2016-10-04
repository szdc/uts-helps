import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { Tabs, Tab } from 'material-ui/Tabs'

import BookingListItem from './BookingListItem'
import CenterLayout from 'layouts/CenterLayout'

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
    const { future, past } = this.props

    return (
      <div className={classes.container}>
        <Tabs
          onChange={this._handleChange}
          value={this.state.slideIndex}
        >
          <Tab label={strings.label_future} value={0} />
          <Tab label={strings.label_past} value={1} />
        </Tabs>
        <SwipeableViews
          containerStyle={{height: '100%'}}
          style={{height: 'calc(100% - 48px)'}}
          index={this.state.slideIndex}
          onChangeIndex={this._handleChange}
        >
          <div style={{height: '100%'}}>
            {!future.length &&
              <CenterLayout>
                <p>{strings.message_no_future_bookings}</p>
                <br />
                <RaisedButton
                  label={strings.label_find_workshop}
                />
              </CenterLayout>
            }
            {future.map(booking => (
              <BookingListItem
                booking={booking}
                key={booking.BookingId}
              />
            ))}
          </div>
          <div style={{height: '100%'}}>
            {!past.length &&
              <CenterLayout>
                <p>{strings.message_no_past_bookings}</p>
                <br />
                <RaisedButton
                  label={strings.label_find_workshop}
                />
              </CenterLayout>
            }
            {past.map(booking => (
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
  bookings: React.PropTypes.array.isRequired,
  future: React.PropTypes.array.isRequired,
  past: React.PropTypes.array.isRequired
}
