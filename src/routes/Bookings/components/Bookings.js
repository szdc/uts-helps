import React from 'react'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { List } from 'material-ui/List'

import BookingListItem from './BookingListItem'

import classes from './Bookings.scss'
import strings from './Bookings.strings'

export default class Bookings extends React.Component {

  /**
   * Renders the booking component.
   */
  render() {
    const { bookings } = this.props

    return (
      <div className={classes.container}>
        <List>
          <Subheader>{strings.label_upcoming}</Subheader>
          {bookings.map(booking => (
            <BookingListItem
              booking={booking}
              key={booking.BookingId}
            />
          ))}
          <Divider />
          <Subheader>{strings.label_past}</Subheader>
        </List>
      </div>
    )
  }
}
Bookings.propTypes = {
  bookings: React.PropTypes.array.isRequired
}
