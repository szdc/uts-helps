import React from 'react'
import DocumentTitle from 'react-document-title'

import Header from 'containers/HeaderContainer'
import NavigationDrawer from 'containers/NavigationDrawerContainer'

import classes from './MobileLayout.scss'

export default class MobileLayout extends React.Component {

  /**
   * Sets up the component.
   */
  constructor(props) {
    super(props)

    this.defaultHeader = {
      contextualOptions: [],
      contextualOptionsHidden: false,
      displayMenuAsBackButton: false,
      title: ''
    }
    this.defaultNavigation = {
      contextualOptions: []
    }
    this.state = {
      header: this.defaultHeader,
      navigation: this.defaultNavigation,
      navigationDrawerOpen: false,
      title: 'Local Deals'
    }
    this.onNavigationDrawerChange = ::this.onNavigationDrawerChange
    this.openNavigationDrawer = ::this.openNavigationDrawer
    this.setHeader = ::this.setHeader
    this.setNavigation = ::this.setNavigation
    this.setTitle = ::this.setTitle
    this.updateHeader = ::this.updateHeader
    this.updateNavigation = ::this.updateNavigation
  }

  /**
   * Resets the header and navigation if the path changes.
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.action === 'PUSH') {
      this.setState({
        header: this.defaultHeader,
        navigation: this.defaultNavigation
      })
    }
  }

  /**
   * Sets the page title.
   *
   * @param title
   * @param suffix
   */
  setTitle(title, suffix = ' - Local Deals') {
    this.setState({
      title: `${title}${suffix}`
    })
    return this
  }

  /**
   * Resets the header options.
   */
  resetHeader() {
    this.setState({
      header: this.defaultHeader
    })
    return this
  }

  /**
   * Sets the header options.
   *
   * @param options
   */
  setHeader(options) {
    this.setState({
      header: options
    })
    return this
  }

  /**
   * Updates the header options.
   *
   * @param options
   */
  updateHeader(options) {
    this.setState({
      header: {
        ...this.state.header,
        ...options
      }
    })
    return this
  }

  /**
   * Resets the navigation options.
   */
  resetNavigation() {
    this.setState({
      navigation: this.defaultNavigation
    })
    return this
  }

  /**
   * Sets the navigation options.
   *
   * @param options
   */
  setNavigation(options) {
    this.setState({
      navigation: options
    })
    return this
  }

  /**
   * Updates the navigation options.
   *
   * @param options
   */
  updateNavigation(options) {
    this.setState({
      navigation: {
        ...this.state.navigation,
        ...options
      }
    })
    return this
  }

  /**
   * Opens the navigation drawer.
   */
  openNavigationDrawer() {
    this.setState({
      navigationDrawerOpen: true
    })
  }

  /**
   * Removes the navigation drawer when the menu closes.
   */
  onNavigationDrawerChange(open) {
    this.setState({
      navigationDrawerOpen: open
    })
  }

  /**
   * Renders the layout.
   *
   * @returns {XML}
   */
  render() {
    const { available, children } = this.props
    const { header } = this.state

    return (
      <DocumentTitle title={this.state.title}>
        <div className={classes.container}>
          <NavigationDrawer
            open={this.state.navigationDrawerOpen}
            onChange={this.onNavigationDrawerChange}
          />
          <Header
            onDrawerClick={this.openNavigationDrawer}
            {...header}
          />
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              {React.cloneElement(children, {
                layout: {
                  available,
                  setCategoryOptions: this.setCategoryOptions,
                  setHeader: this.setHeader,
                  setNavigation: this.setNavigation,
                  setTitle: this.setTitle,
                  updateHeader: this.updateHeader,
                  updateNavigation: this.updateNavigation
                },
                setHeader: this.setHeader,
                setTitle: this.setTitle,
                updateHeader: this.updateHeader
              })}
            </div>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}
MobileLayout.propTypes = {
  available: React.PropTypes.bool.isRequired,
  children: React.PropTypes.element.isRequired,
  location: React.PropTypes.object.isRequired
}
MobileLayout.defaultProps = {
  available: true
}
