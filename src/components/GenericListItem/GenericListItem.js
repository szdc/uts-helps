import React from 'react'
import { ListItem } from 'material-ui/List'

import { getDateString, getTimeString } from 'utils/helpers'

import classes from './GenericListItem.scss'
import strings from './GenericListItem.strings'

export default class GenericListItem extends React.Component {

  /**
   * Renders the list item.
   */
  render() {
    const {
      actions,
      additionalText,
      campus,
      cutoffReached,
      description,
      endDate,
      isWaitlistable,
      isWaitisted,
      remaining,
      startDate,
      targetGroup,
      topic,
      waitlistSize
    } = this.props

    return (
      <ListItem
        innerDivStyle={{lineHeight: '1.2'}}
        nestedItems={[
          <ListItem
            className={classes.moreInfo}
            innerDivStyle={{
              backgroundColor: '#f4f4f4',
              margin: '0',
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
                {(cutoffReached && waitlistSize >= 0) ?
                  <div className={classes.infoLine}>
                    <span className={classes.heading}>{strings.label_waitlist}</span>
                    <span className={classes.content}>{waitlistSize}</span>
                  </div> : null
                }
                {!isWaitisted && !isWaitlistable &&
                  <div className={classes.infoLine}>
                    <span className={classes.heading}>{strings.label_available}</span>
                    <span className={classes.content}>{remaining}</span>
                  </div>
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
    )
  }
}
GenericListItem.propTypes = {
  actions: React.PropTypes.node,
  additionalText: React.PropTypes.node,
  campus: React.PropTypes.string,
  cutoffReached: React.PropTypes.bool,
  description: React.PropTypes.string,
  isWaitlistable: React.PropTypes.bool,
  isWaitisted: React.PropTypes.bool,
  endDate: React.PropTypes.string,
  remaining: React.PropTypes.number,
  startDate: React.PropTypes.string,
  targetGroup: React.PropTypes.string,
  topic: React.PropTypes.string,
  waitlistSize: React.PropTypes.number
}
