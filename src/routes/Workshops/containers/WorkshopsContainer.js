import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import { IconSearch } from 'components/Icons'
import FilterDialog from './FilterDialogContainer'
import Loading from 'components/Loading'
import Workshops from '../components/Workshops'
import { fetchWorkshopSets } from 'store/workshopSets/actions'
import { searchWorkshops } from 'store/workshops/actions'

import strings from './WorkshopsContainer.strings'

class WorkshopsContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      filter: {},
      showFilterDialog: false
    }
    this._closeFilter = ::this._closeFilter
    this._onFilterClick = ::this._onFilterClick
    this._onFilterUpdated = ::this._onFilterUpdated
    this._onWorkshopClick = ::this._onWorkshopClick
  }

  /**
   * Fetches the workshops.
   */
  componentDidMount() {
    const { fetchWorkshopSets, layout, params, searchWorkshops, workshopSets } = this.props
    searchWorkshops({
      workshopSetId: params.id
    })
    if (workshopSets.loading || !workshopSets.workshopSets) {
      fetchWorkshopSets()
    }
    layout
      .setHeader({
        contextualOptions: [
          <IconSearch
            onTouchTap={this._onFilterClick}
          />
        ],
        displayMenuAsBackButton: true,
        title: strings.title
      })
      .setTitle(strings.page_title)
  }

  /**
   * Navigates to the workshop.
   *
   * @param workshop
   * @private
   */
  _onWorkshopClick(workshop) {
    this.props.push(`/workshop/${workshop.WorkshopId}`)
  }

  /**
   * Shows the filter dialog.
   *
   * @private
   */
  _onFilterClick() {
    this.setState({
      showFilterDialog: true
    })
  }

  /**
   * Hides the filter dialog.
   *
   * @private
   */
  _closeFilter() {
    this.setState({
      showFilterDialog: false
    })
  }

  /**
   * Refreshes workshops if the filter is updated.
   *
   * @param filter
   * @private
   */
  _onFilterUpdated(filter) {
    this.setState({
      filter,
      showFilterDialog: false
    })
    const searchParams = {}
    if (filter.startDate) {
      searchParams.startingDtBegin = moment(filter.startDate).format('YYYY-MM-DD')
      searchParams.startingDtEnd = moment(filter.startDate).add(1, 'years').format('YYYY-MM-DD')
    }
    if (filter.endDate) {
      searchParams.endingDtBegin = moment(filter.endDate).format('YYYY-MM-DD')
      searchParams.endingDtEnd = moment(filter.endDate).add(1, 'years').format('YYYY-MM-DD')
    }
    if (filter.campusId) {
      searchParams.campusId = filter.campusId
    }
    this.props.searchWorkshops(searchParams)
  }

  /**
   * Renders the workshop list.
   *
   * @returns {XML}
   */
  render() {
    const { params, workshops, workshopSets } = this.props

    if (workshops.loading || !workshops.workshops || workshopSets.loading || !workshopSets.workshopSets) {
      return (
        <Loading />
      )
    }

    return (
      <div style={{height: '100%'}}>
        <Workshops
          filter={this.state.filter}
          onWorkshopClick={this._onWorkshopClick}
          workshops={workshops.workshops}
          workshopSet={workshopSets.workshopSets.find(set => set.id === +params.id)}
        />
        <FilterDialog
          filter={this.state.filter}
          onCloseFilter={this._closeFilter}
          onSubmit={this._onFilterUpdated}
          open={this.state.showFilterDialog}
        />
      </div>
    )
  }
}
WorkshopsContainer.propTypes = {
  fetchWorkshopSets: React.PropTypes.func.isRequired,
  layout: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired,
  searchWorkshops: React.PropTypes.func.isRequired,
  workshops: React.PropTypes.object.isRequired,
  workshopSets: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  workshops: workshopSelector(state),
  workshopSets: state.workshopSets
})

/**
 * Adds the following keys to workshops:
 * - cutoffReached {bool} - whether or not the cutoff has been reached
 * - isBookable {bool} - if the workshop can be booked
 * - isBooked {bool} - if the workshop has been booked
 * - isWaitlistable {bool} - if the workshop can be waitlisted
 * - remaining {number} - the number of spaces remaining
 * - waitlistSize {number} - the number of people on the waitlist
 */
const workshopSelector = createSelector(
  state => state.workshops,
  workshops => {
    if (workshops.loading || !workshops.workshops) {
      return workshops
    }
    workshops.workshops = workshops.workshops.map(workshop => {
      workshop.cutoffReached = workshop.cutoff ? workshop.BookingCount >= workshop.cutoff : false
      workshop.isBooked = workshop.bookingId !== null
      workshop.remaining = Math.max(workshop.maximum - workshop.BookingCount, 0)
      workshop.isWaitlistable = workshop.bookingId === null && (workshop.remaining === 0 || workshop.cutoffReached)
        && !workshop.isWaitlisted
      workshop.isBookable = workshop.bookingId === null && workshop.remaining > 0
        && !workshop.isWaitlistable && !workshop.isWaitlisted

      if (workshop.cutoff) {
        workshop.waitlistSize = Math.max(
          workshop.BookingCount - workshop.cutoff, workshop.BookingCount - workshop.maximum, 0
        )
      } else {
        workshop.waitlistSize = Math.max(workshop.BookingCount - workshop.maximum, 0)
      }
      return workshop
    })
    return workshops
  }
)

const mapDispatchToProps = {
  fetchWorkshopSets,
  searchWorkshops,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopsContainer)
