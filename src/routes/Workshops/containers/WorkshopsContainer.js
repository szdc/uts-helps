import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import { IconFilter } from 'components/Icons'
import FilterDialog from './FilterDialogContainer'
import Loading from 'components/Loading'
import Workshops from '../components/Workshops'
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
      showFilterDialog: false
    }
    this._closeFilter = ::this._closeFilter
    this._onFilterClick = ::this._onFilterClick
    this._onWorkshopClick = ::this._onWorkshopClick
  }

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { layout, params, searchWorkshops } = this.props
    searchWorkshops({
      workshopSetId: params.id
    })
    layout
      .setHeader({
        contextualOptions: [
          <IconFilter
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
   * Renders the workshop list.
   *
   * @returns {XML}
   */
  render() {
    const { workshops } = this.props

    if (workshops.loading || !workshops.workshops) {
      return (
        <Loading />
      )
    }

    return (
      <div>
        <Workshops
          onWorkshopClick={this._onWorkshopClick}
          workshops={workshops.workshops}
        />
        <FilterDialog
          actions={[
            <FlatButton
              label={strings.label_cancel}
              onTouchTap={this._closeFilter}
            />,
            <FlatButton
              label={strings.label_confirm}
              onTouchTap={this._onSubmit}
              primary
            />
          ]}
          onCloseFilter={this._closeFilter}
          open={this.state.showFilterDialog}
        />
      </div>
    )
  }
}
WorkshopsContainer.propTypes = {
  layout: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired,
  searchWorkshops: React.PropTypes.func.isRequired,
  workshops: React.PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  workshops: workshopSelector(state)
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
      workshop.isWaitlistable = workshop.bookingId === null && (workshop.remaining === 0 || workshop.cutoffReached)
        && !workshop.isWaitlisted
      workshop.isBookable = workshop.bookingId === null && !workshop.isWaitlistable && !workshop.isWaitlisted
      workshop.remaining = Math.max(workshop.maximum - workshop.BookingCount, 0)
      workshop.waitlistSize = workshop.cutoff ? workshop.BookingCount - workshop.cutoff : 0
      return workshop
    })
    return workshops
  }
)

const mapDispatchToProps = {
  searchWorkshops,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopsContainer)
