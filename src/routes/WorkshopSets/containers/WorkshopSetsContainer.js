import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import WorkshopSets from '../components/WorkshopSets'
import Loading from 'components/Loading'
import { fetchWorkshopSets } from 'store/workshopSets/actions'

import strings from './WorkshopSetsContainer.strings'

class WorkshopSetsContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onWorkshopSetClick = ::this._onWorkshopSetClick
  }

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { fetchWorkshopSets, layout, workshopSets } = this.props
    if (!workshopSets.loading && !workshopSets.workshopSets) {
      fetchWorkshopSets()
    }
    layout
    .setHeader({
      title: strings.title
    })
    .setTitle(strings.page_title)
  }

  /**
   * Navigates to the workshop set.
   *
   * @param workshopSet
   * @private
   */
  _onWorkshopSetClick(workshopSet) {
    this.props.push(`/workshop-set/${workshopSet.id}`)
  }

  /**
   * Renders the workshop list.
   *
   * @returns {XML}
   */
  render() {
    const { workshopSets } = this.props

    if (workshopSets.loading || !workshopSets.workshopSets) {
      return (
        <Loading />
      )
    }

    return (
      <WorkshopSets
        onWorkshopSetClick={this._onWorkshopSetClick}
        workshopSets={workshopSets.workshopSets}
      />
    )
  }
}
WorkshopSetsContainer.propTypes = {
  workshopSets: React.PropTypes.object.isRequired,
  fetchWorkshopSets: React.PropTypes.func.isRequired,
  layout: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  workshopSets: state.workshopSets
})

const mapDispatchToProps = {
  fetchWorkshopSets,
  push
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkshopSetsContainer)
