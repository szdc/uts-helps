import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { ListItem } from 'material-ui/List'

import { getDateString, getTimeString } from 'utils/helpers'

import classes from './WorkshopListItem.scss'
import strings from './WorkshopListItem.strings'

export default class WorkshopListItem extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onBookClick = ::this._onBookClick
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
   * Handles a click on the book session button.
   *
   * @private
   */
  _onBookClick() {
    const { onBookClick, workshop } = this.props
    onBookClick(workshop)
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
        nestedItems={[
          <ListItem
            className={classes.moreInfo}
            innerDivStyle={{
              backgroundColor: '#f4f4f4',
              margin: '0',
              padding: '10px 21px'
            }}
            style={{margin: '-10px 0'}}
            key={Math.random()}>
            <div className={classes.moreInfoContainer}>
              <div className={classes.actions}>
                <RaisedButton
                  label={strings.label_book_workshop}
                  onClick={this._onBookClick}
                  primary
                />
              </div>
              <div className={classes.moreInfoContent}>
                <div className={classes.infoLine}>
                  <span className={classes.heading}>{strings.label_available}</span>
                  <span className={classes.content}>{workshop.maximum - workshop.BookingCount}</span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.heading}>{strings.label_campus}</span>
                  <span className={classes.content}>{workshop.campus}</span>
                </div>
                <div className={classes.infoLine}>
                  <span className={classes.heading}>{strings.label_target_group}</span>
                  <span className={classes.content}>{workshop.targetingGroup}</span>
                </div>
              </div>
            </div>
          </ListItem>
        ]}
        primaryText={workshop.topic}
        primaryTogglesNestedList
        secondaryText={
          <p className={classes.secondaryText}>
            {getDateString(workshop.StartDate)}
            <br />
            {getTimeString(workshop.StartDate, workshop.EndDate)}
          </p>
        }
        secondaryTextLines={2}
      />
    )
  }
}
WorkshopListItem.propTypes = {
  onBookClick: React.PropTypes.func,
  onClick: React.PropTypes.func,
  workshop: React.PropTypes.object.isRequired
}
WorkshopListItem.defaultProps = {
  onBookClick: () => {},
  onClick: () => {}
}
