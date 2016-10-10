import React from 'react'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'

export default class WorkshopSetListItem extends React.Component {

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
    const { onClick, workshopSet } = this.props
    onClick(workshopSet)
  }

  /**
   * Renders the workshop set item.
   *
   * @returns {XML}
   */
  render() {
    const { workshopSet } = this.props

    return (
      <div>
        <ListItem
          onTouchTap={this._onClick}
          primaryText={workshopSet.name}
        />
        <Divider style={{backgroundColor: '#eee'}} />
      </div>
    )
  }
}
WorkshopSetListItem.propTypes = {
  onClick: React.PropTypes.func,
  workshopSet: React.PropTypes.object.isRequired
}
