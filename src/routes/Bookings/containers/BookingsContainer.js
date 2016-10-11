import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import Bookings from '../components/Bookings'
import Loading from 'components/Loading'
import { fetchBookings } from 'store/bookings/actions'
import { IconAdd } from 'components/Icons'

import strings from './BookingsContainer.strings.js'

class BookingsContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._findWorkshops = ::this._findWorkshops
  }

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { fetchBookings, layout } = this.props
    fetchBookings()
    layout
      .setHeader({
        contextualOptions: [
          <IconAdd
            onClick={this._findWorkshops}
          />
        ],
        title: strings.title
      })
      .setTitle(strings.page_title)
  }

  /**
   * Navigates to the find workshops page.
   *
   * @private
   */
  _findWorkshops() {
    this.props.push('/workshop-sets')
  }

  /**
   * Renders the booking list.
   *
   * @returns {XML}
   */
  render() {
    const {
      bookings,
      futureBookings,
      pastBookings
    } = this.props

    if (bookings.loading || !bookings.bookings) {
      return (
        <Loading />
      )
    }

    return (
      <Bookings
        bookings={bookings.bookings}
        future={futureBookings}
        onFindWorkshopClick={this._findWorkshops}
        past={pastBookings}
      />
    )
  }
}
BookingsContainer.propTypes = {
  bookings: React.PropTypes.object.isRequired,
  fetchBookings: React.PropTypes.func.isRequired,
  layout: React.PropTypes.object.isRequired,
  pastBookings: React.PropTypes.array,
  push: React.PropTypes.func.isRequired,
  futureBookings: React.PropTypes.array
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  pastBookings: pastBookingsSelector(state),
  futureBookings: futureBookingsSelector(state)
})

/**
 * Selects bookings which are in the future.
 */
const futureBookingsSelector = createSelector(
  state => state.bookings,
  bookings => {
    if (bookings.loading || !bookings.bookings) {
      return []
    }
    const now = moment()
    const futureBookings = bookings.bookings.filter(booking =>
      moment(booking.ending).isAfter(now)
    ).map(booking => {
      booking.isInProgress = moment(booking.starting).isBefore(now) && moment(booking.ending).isAfter(now)
      booking.isUpcoming = true
      return booking
    })

    futureBookings.sort(compareBookingsByDate)

    return futureBookings
  }
)

/**
 * Selects bookings which were in the past.
 */
const pastBookingsSelector = createSelector(
  state => state.bookings,
  bookings => {
    if (bookings.loading || !bookings.bookings) {
      return []
    }
    const now = moment()
    const pastBookings = bookings.bookings.filter(booking =>
      moment(booking.ending).isBefore(now)
    ).map(booking => {
      booking.isInProgress = false
      booking.isUpcoming = false
      return booking
    })

    pastBookings.sort(compareBookingsByDate)

    return pastBookings
  }
)

/**
 * Compares bookings by start date.
 *
 * @param bookingA
 * @param bookingB
 */
const compareBookingsByDate = (bookingA, bookingB) => {
  return moment(bookingA.starting).unix() - moment(bookingB.starting).unix()
}

const mapDispatchToProps = {
  fetchBookings,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsContainer)
