import React from 'react'
import classes from './NoAuthLayout.scss'
import '../../styles/core.scss'

export const NoAuthLayout = ({ children }) => (
  <div className={classes.container}>
    <div className={classes.content}>
      {
        children
      }
    </div>
  </div>
)

NoAuthLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default NoAuthLayout
