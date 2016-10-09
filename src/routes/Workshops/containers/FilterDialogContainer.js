import React from 'react'
import { connect } from 'react-redux'

import FilterDialog from '../components/FilterDialog'
import Loading from 'components/Loading'
import { fetchCampuses } from 'store/campuses/actions'

class FilterDialogContainer extends React.Component {

  /**
   * Fetches the list of campuses.
   */
  componentDidMount() {
    const { campuses, fetchCampuses } = this.props
    if (!campuses.campuses) {
      fetchCampuses()
    }
  }

  /**
   * Renders the workshop list.
   *
   * @returns {XML}
   */
  render() {
    const { campuses } = this.props

    if (campuses.loading || !campuses.campuses) {
      return (
        <Loading />
      )
    }

    return (
      <FilterDialog
        campuses={campuses.campuses}
      />
    )
  }
}
FilterDialogContainer.propTypes = {
  campuses: React.PropTypes.object.isRequired,
  fetchCampuses: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  campuses: state.campuses
})

const mapDispatchToProps = {
  fetchCampuses
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialogContainer)
