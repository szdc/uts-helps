import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Bookings from '../components/Bookings'
import CenterLayout from 'layouts/CenterLayout'
import Loading from 'components/Loading'
import { fetchBookings } from 'store/bookings/actions'
import { IconAdd } from 'components/Icons'

import strings from './BookingsContainer.strings.js'

export default class BookingsContainer extends React.Component {

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
    this.props.push('/workshops')
  }

  /**
   * Renders the booking list.
   *
   * @returns {XML}
   */
  render() {
    const { bookings } = this.props

    if (bookings.loading || !bookings.bookings) {
      return (
        <Loading />
      )
    }

    if (!bookings.bookings.length) {
      return (
        <CenterLayout>
          <p>{strings.message_no_bookings}</p>
          <br />
          <RaisedButton
            label={strings.label_find_workshop}
          />
        </CenterLayout>
      )
    }

    return (
      <div>
        <Bookings
          bookings={bookings.bookings}
        />
      </div>
    )
  }
}
BookingsContainer.propTypes = {
  bookings: React.PropTypes.object.isRequired,
  fetchBookings: React.PropTypes.func.isRequired,
  layout: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  bookings: state.bookings
})

const mapDispatchToProps = {
  fetchBookings,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingsContainer)
