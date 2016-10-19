import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import Bookings from '../components/Bookings'
import Loading from 'components/Loading'
import { fetchBookings } from 'store/bookings/actions'
import { fetchReminders } from 'store/reminders/actions/fetch'
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
    this._onHideHelp = ::this._onHideHelp
  }

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { fetchBookings, fetchReminders, reminders } = this.props
    fetchBookings()
    if (!reminders.loading && !reminders.reminders) {
      fetchReminders()
    }
    this._setLayout()
  }

  /**
   * Only updates the layout if the route changes.
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.help !== this.props.location.query.help) {
      this._setLayout()
    }
  }

  /**
   * Sets up the layout.
   *
   * @private
   */
  _setLayout() {
    const { layout } = this.props
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
   * Hides the help overlay.
   *
   * @private
   */
  _onHideHelp() {
    this.props.push('/bookings')
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
      location,
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
        onHelpClose={this._onHideHelp}
        past={pastBookings}
        showHelp={typeof location.query.help !== 'undefined'}
      />
    )
  }
}
BookingsContainer.propTypes = {
  bookings: React.PropTypes.object.isRequired,
  fetchBookings: React.PropTypes.func.isRequired,
  fetchReminders: React.PropTypes.func.isRequired,
  futureBookings: React.PropTypes.array,
  layout: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  pastBookings: React.PropTypes.array,
  push: React.PropTypes.func.isRequired,
  reminders: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  bookings: state.bookings,
  pastBookings: pastBookingsSelector(state),
  futureBookings: futureBookingsSelector(state),
  reminders: state.reminders
})

/**
 * Selects bookings which are in the future.
 */
const futureBookingsSelector = createSelector(
  state => state.bookings,
  state => state.reminders,
  (bookings, reminders) => {
    if (bookings.loading || !bookings.bookings || reminders.loading || !reminders.reminders) {
      return []
    }
    const now = moment()

    const futureBookings = bookings.bookings.filter(booking =>
      moment(booking.ending).isAfter(now)
    ).map(booking => {
      booking.duration = moment.duration(moment(booking.ending).diff(booking.starting)).asHours()
      booking.isInProgress = moment(booking.starting).isBefore(now) && moment(booking.ending).isAfter(now)
      booking.isUpcoming = true
      booking.reminders = reminders.reminders.filter(reminder => reminder.workshopId === booking.workshopID)

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
      booking.duration = moment.duration(moment(booking.ending).diff(booking.starting)).asHours()
      booking.isInProgress = false
      booking.isUpcoming = false
      booking.reminders = []
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
  fetchReminders,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsContainer)
