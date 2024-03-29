import React from 'react'
import Divider from 'material-ui/Divider'
import { ListItem } from 'material-ui/List'

import { getDateString, getTimeString } from 'utils/helpers'

import classes from './GenericListItem.scss'
import strings from './GenericListItem.strings'

export default class GenericListItem extends React.Component {

  /**
   * Returns a string representing the item type.
   */
  _getType(type) {
    switch (type) {
      case 'single':
      case 'multiple':
        return 'Workshop'
      default:
        return type
    }
  }

  /**
   * Renders the list item.
   */
  render() {
    const {
      actions,
      additionalText,
      campus,
      description,
      duration,
      endDate,
      isWaitlistable,
      isWaitlisted,
      remaining,
      startDate,
      targetGroup,
      topic,
      type,
      waitlistSize
    } = this.props

    return (
      <div>
        <ListItem
          innerDivStyle={{lineHeight: '1.2'}}
          nestedItems={[
            <ListItem
              className={classes.moreInfo}
              innerDivStyle={{
                backgroundColor: '#f4f4f4',
                margin: '0',
                overflow: 'hidden',
                padding: '10px 21px'
              }}
              style={{margin: '-10px 0'}}
              key={Math.random()}
            >
              <div className={classes.moreInfoContainer}>
                <div className={classes.actions}>
                  {actions}
                </div>
                <div className={classes.moreInfoContent}>
                  {(isWaitlistable || isWaitlisted) ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_waitlist}</span>
                      <span className={classes.content}>{waitlistSize}</span>
                    </div> : null
                  }
                  {!isWaitlisted && !isWaitlistable && typeof remaining !== 'undefined' &&
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_available}</span>
                      <span className={classes.content}>{remaining}</span>
                    </div>
                  }
                  {typeof type !== 'undefined' ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_type}</span>
                      <span className={classes.content}>{this._getType(type)}</span>
                    </div> : null
                  }
                  {typeof duration !== 'undefined' ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_duration}</span>
                      <span className={classes.content}>{duration} {duration === 1 ? 'hour' : 'hours'}</span>
                    </div> : null
                  }
                  {campus ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_campus}</span>
                      <span className={classes.content}>{campus}</span>
                    </div> : null
                  }
                  {targetGroup ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_target_group}</span>
                      <span className={classes.content}>{targetGroup}</span>
                    </div> : null
                  }
                  {description ?
                    <div className={classes.infoLine}>
                      <span className={classes.heading}>{strings.label_description}</span>
                      <span className={classes.content}>{description}</span>
                    </div> : null
                  }
                </div>
              </div>
            </ListItem>
          ]}
          primaryText={
            <div className={classes.primaryText}>
              {topic}
            </div>
          }
          primaryTogglesNestedList
          secondaryText={
            <div className={classes.secondaryText}>
              {getDateString(startDate)}
              <br />
              <div>
                {getTimeString(startDate, endDate)}
                {additionalText}
              </div>
            </div>
          }
          secondaryTextLines={2}
        />
        <Divider style={{backgroundColor: '#eee'}} />
      </div>
    )
  }
}
GenericListItem.propTypes = {
  actions: React.PropTypes.node,
  additionalText: React.PropTypes.node,
  campus: React.PropTypes.string,
  cutoffReached: React.PropTypes.bool,
  description: React.PropTypes.string,
  duration: React.PropTypes.number,
  isWaitlistable: React.PropTypes.bool,
  isWaitlisted: React.PropTypes.bool,
  endDate: React.PropTypes.string,
  remaining: React.PropTypes.number,
  startDate: React.PropTypes.string,
  targetGroup: React.PropTypes.string,
  topic: React.PropTypes.string,
  type: React.PropTypes.string,
  waitlistSize: React.PropTypes.number
}
