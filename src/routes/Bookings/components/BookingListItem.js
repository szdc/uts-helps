import React from 'react'
import { ListItem } from 'material-ui/List'

export default class BookingListItem extends React.Component {

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
