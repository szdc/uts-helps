import React from 'react'
import TextField from 'material-ui/TextField'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import Bookings from '../components/Bookings'
import { IconClose, IconSearch } from 'components/Icons'

import classes from './BookingsContainer.scss'
import strings from './BookingsContainer.strings.js'

export default class BookingsContainer extends React.Component {

  /**
   * Fetches the user's profile.
   */
  componentDidMount() {
    const { layout } = this.props
    layout.setHeader({
      contextualOptions: [
        <IconSearch
          onClick={this._toggleSearch}
        />
      ],
      title: strings.title
    })
  }

  /**
   * Toggles the search bar.
   *
   * @private
   */
  _toggleSearch() {
    this.setState({
      searching: !this.state.searching
    }, () => {
      let search =
        <IconSearch
          onClick={this._toggleSearch}
        />

      if (this.state.searching) {
        search =
          <div>
            <div className={classes.search}>
              <TextField
                name='search'
                onChange={this._onFilterChange}
                ref={c => c !== null && c.focus()}
              />
              <IconClose
                onClick={this._toggleSearch}
              />
            </div>
          </div>
      }

      this.props.layout.updateHeader({
        contextualOptions: [search]
      })
    })
  }

  /**
   * Renders the Navigation Drawer.
   *
   * @returns {*}
   */
  render() {
    return (
      <div>
        <Bookings />
      </div>
    )
  }
}
BookingsContainer.propTypes = {
  layout: React.PropTypes.object.isRequired,
  push: React.PropTypes.func.isRequired
}

const mapDispatchToProps = {
  push
}

export default connect(null, mapDispatchToProps)(BookingsContainer)
