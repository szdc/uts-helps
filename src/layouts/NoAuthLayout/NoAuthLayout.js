import React from 'react'
import DocumentTitle from 'react-document-title'
import '../../styles/core.scss'

import classes from './NoAuthLayout.scss'

export default class NoAuthLayout extends React.Component {

  /**
   * Sets up the component.
   */
  constructor(props) {
    super(props)

    this.state = {
      title: 'UTS:HELPS Booking System'
    }
    this.setTitle = ::this.setTitle
  }

  /**
   * Sets the page title.
   *
   * @param title
   * @param suffix
   */
  setTitle(title, suffix = ' - UTS:HELPS Booking System') {
    this.setState({
      title: `${title}${suffix}`
    })
    return this
  }

  /**
   * Renders the layout.
   *
   * @returns {XML}
   */
  render() {
    const { children } = this.props

    return (
      <DocumentTitle title={this.state.title}>
        <div className={classes.container}>
          <div className={classes.content}>
            {React.cloneElement(children, {
              layout: {
                setTitle: this.setTitle
              }
            })}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
NoAuthLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}
