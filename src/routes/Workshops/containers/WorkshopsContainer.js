import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { push } from 'react-router-redux'

import Workshops from '../components/Workshops'
import Loading from 'components/Loading'
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
    this._onWorkshopClick = ::this._onWorkshopClick
  }

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { searchWorkshops, layout, params } = this.props
    searchWorkshops({
      workshopSetId: params.id
    })
    layout
      .setHeader({
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
      <Workshops
        onWorkshopClick={this._onWorkshopClick}
        workshops={workshops.workshops}
      />
    )
  }
}
WorkshopsContainer.propTypes = {
  workshops: React.PropTypes.object.isRequired,
  searchWorkshops: React.PropTypes.func.isRequired,
  layout: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  workshops: workshopSelector(state)
})

/**
 * Adds the following keys to workshops:
 * - remaining {number} - the number of spaces remaining
 * - cutoffReached {bool} - whether or not the cutoff has been reached
 * - waitlistSize {number} - the number of people on the waitlist
 */
const workshopSelector = createSelector(
  state => state.workshops,
  workshops => {
    if (workshops.loading || !workshops.workshops) {
      return []
    }
    workshops.workshops = workshops.workshops.map(workshop => {
      workshop.remaining = Math.max(workshop.maximum - workshop.BookingCount, 0)
      workshop.cutoffReached = workshop.cutoff ? workshop.BookingCount >= workshop.cutoff : false
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
