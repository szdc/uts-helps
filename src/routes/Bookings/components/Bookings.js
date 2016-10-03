import React from 'react'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import { List, ListItem } from 'material-ui/List'

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

class BookingListItem extends React.Component {

  /**
   * Renders the booking item.
   *
   * @returns {XML}
   */
  render() {
    const { booking } = this.props

    return (
      <ListItem
        primaryText={booking.topic}
        secondaryText={booking.description}
        secondaryTextLines={2}
      />
    )
  }
}
BookingListItem.propTypes = {
  booking: React.PropTypes.object.isRequired
}
