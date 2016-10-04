import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import BookingListItem from './BookingListItem'
import CenterLayout from 'layouts/CenterLayout'

import strings from './Bookings.strings'

export default class BookingsTab extends React.Component {

  /**
   * Renders the bookings tab.
   */
  render() {
    const {
      bookings,
      labelFindWorkshop,
      messageNoBookings,
      onFindWorkshopClick
    } = this.props

    return (
      <div style={{height: '100%'}}>
        {!bookings.length &&
          <CenterLayout>
            <p>{messageNoBookings}</p>
            <br />
            <RaisedButton
              label={labelFindWorkshop}
              onClick={onFindWorkshopClick}
            />
          </CenterLayout>
        }
        {bookings.map(booking => (
          <BookingListItem
            booking={booking}
            key={booking.BookingId}
          />
        ))}
      </div>
    )
  }
}
BookingsTab.propTypes = {
  bookings: React.PropTypes.array.isRequired,
  labelFindWorkshop: React.PropTypes.string,
  messageNoBookings: React.PropTypes.string,
  onFindWorkshopClick: React.PropTypes.func
}
BookingsTab.defaultProps = {
  labelFindWorkshop: strings.label_find_workshop,
  messageNoBookings: '',
  onFindWorkshopClick: () => {}
}
