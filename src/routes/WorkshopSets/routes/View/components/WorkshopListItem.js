import React from 'react'
import { ListItem } from 'material-ui/List'

export default class WorkshopListItem extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onClick = ::this._onClick
  }

  /**
   * Handles a click on the item.
   *
   * @private
   */
  _onClick() {
    const { onClick, workshop } = this.props
    onClick(workshop)
  }

  /**
   * Renders the workshop set item.
   *
   * @returns {XML}
   */
  render() {
    const { workshop } = this.props

    return (
      <ListItem
        onTouchTap={this._onClick}
        primaryText={workshop.topic}
      />
    )
  }
}
WorkshopListItem.propTypes = {
  onClick: React.PropTypes.func,
  workshop: React.PropTypes.object.isRequired
}
