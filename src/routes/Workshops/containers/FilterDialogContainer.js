import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import FilterDialog from '../components/FilterDialog'
import { fetchCampuses } from 'store/campuses/actions'

import strings from './FilterDialogContainer.strings'

class FilterDialogContainer extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)

    this.state = {
      filter: {}
    }
    this._onSubmit = ::this._onSubmit
    this._onFilterChange = ::this._onFilterChange
  }

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
   * Handles a change to the filter.
   *
   * @param filter
   * @private
   */
  _onFilterChange(filter) {
    this.setState({
      filter
    })
  }

  /**
   * Updates the filter.
   *
   * @private
   */
  _onSubmit() {
    this.props.onSubmit(this.state.filter)
  }

  /**
   * Renders the workshop list.
   *
   * @returns {XML}
   */
  render() {
    const {
      campuses,
      onCloseFilter,
      open
    } = this.props

    return (
      <Dialog
        actions={[
          <FlatButton
            label={strings.label_cancel}
            onTouchTap={onCloseFilter}
          />,
          <FlatButton
            label={strings.label_confirm}
            onTouchTap={this._onSubmit}
            primary
          />
        ]}
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
          onFilterChange={this._onFilterChange}
        />
      </Dialog>
    )
  }
}
FilterDialogContainer.propTypes = {
  campuses: React.PropTypes.object.isRequired,
  fetchCampuses: React.PropTypes.func.isRequired,
  onCloseFilter: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  campuses: state.campuses
})

const mapDispatchToProps = {
  fetchCampuses
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDialogContainer)
