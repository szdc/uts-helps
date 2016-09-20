import React from 'react'

import classes from './CenterLayout.scss'

const CenterLayout = props => (
  <div className={classes.container}>
    <div className={classes.centered}>
      {props.children}
    </div>
  </div>
)
CenterLayout.propTypes = {
  children: React.PropTypes.any
}

export default CenterLayout
