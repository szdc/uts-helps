import React from 'react'
import { IconBack, IconMenu } from 'components/Icons'

import classes from './Header.scss'

export default class Header extends React.Component {

  /**
   * Sets up the component.
   *
   * @param props
   */
  constructor(props) {
    super(props)
    this._onDrawerClick = ::this._onDrawerClick
  }

  /**
   * Handles a click on the drawer icon.
   *
   * @private
   */
  _onDrawerClick() {
    const { displayMenuAsBackButton, onBackButtonClick, onDrawerClick } = this.props
    if (displayMenuAsBackButton) {
      onBackButtonClick()
    } else {
      onDrawerClick()
    }
  }

  /**
   * Renders the component.
   *
   * @returns {XML}
   */
  render() {
    const {
      contextualOptions,
      contextualOptionsHidden,
      displayMenuAsBackButton,
      title
    } = this.props

    return (
      <nav className={classes.container}>
        <div className={classes.pullLeft}>
          {
            displayMenuAsBackButton
            ? <IconBack className={classes.icon} onClick={this._onDrawerClick} />
            : <IconMenu className={classes.icon} onClick={this._onDrawerClick} />
          }
        </div>
        {title &&
          <h1 className={classes.title}>{title}</h1>
        }
        {!contextualOptionsHidden && contextualOptions.length > 0 &&
          <div className={classes.pullRight}>
            {contextualOptions.map((option, i) => React.cloneElement(option, {
              className: `${classes.icon} ${option.className || ''}`,
              key: option.key || i
            }))}
          </div>
        }
      </nav>
    )
  }
}

Header.propTypes = {
  contextualOptions: React.PropTypes.node,
  contextualOptionsHidden: React.PropTypes.bool,
  displayMenuAsBackButton: React.PropTypes.bool,
  goBack: React.PropTypes.any,
  title: React.PropTypes.string,
  onBackButtonClick: React.PropTypes.func,
  onDrawerClick: React.PropTypes.func
}
Header.defaultProps = {
  displayMenuAsBackButton: false,
  contextualOptions: [],
  contextualOptionsHidden: false,
  onBackButtonClick: () => {},
  onDrawerClick: () => {},
  title: ''
}

export default Header
