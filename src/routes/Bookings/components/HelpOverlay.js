import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import classes from './HelpOverlay.scss'

export default class HelpOverlay extends React.Component {

  /**
   * Renders the help overlay.
   */
  render() {
    const { hasBookings } = this.props

    return (
      <div className={classes.container}>
        <img
          className={classes.title}
          src='/images/helpstitle.png'
        />
        <img
          className={classes.step1}
          src='/images/helps1.png'
        />
        <img
          className={classes.step2}
          src='/images/helps2.png'
        />
        {!hasBookings &&
          <img
            className={classes.step3}
            src='/images/helps3a.png'
          />
        }
        <RaisedButton
          className={classes.button}
          label='Got it!'
          onTouchTap={this.props.onClose}
          primary
        />
      </div>
    )
  }
}
HelpOverlay.propTypes = {
  hasBookings: React.PropTypes.bool,
  onClose: React.PropTypes.func.isRequired
}
HelpOverlay.defaultProps = {
  hasBookings: false
}
