import React from 'react'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'

import FilterDialog from '../components/FilterDialog'
import { fetchCampuses } from 'store/campuses/actions'

import strings from './FilterDialogContainer.strings'

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
    const {
      actions,
      campuses,
      onCloseFilter,
      open
    } = this.props

    return (
      <Dialog
        actions={actions}
        bodyStyle={{
          lineHeight: '1.4',
          paddingBottom: '0'
        }}
        onRequestClose={onCloseFilter}
        open={open}
        repositionOnUpdate={false}
        title={strings.title}
      >
        <FilterDialog
          campuses={campuses.campuses || []}
        />
      </Dialog>
    )
  }
}
FilterDialogContainer.propTypes = {
  actions: React.PropTypes.array,
  campuses: React.PropTypes.object.isRequired,
  fetchCampuses: React.PropTypes.func.isRequired,
  onCloseFilter: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  campuses: state.campuses
})

const mapDispatchToProps = {
  fetchCampuses
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialogContainer)
