import React from 'react'
import classes from './Spinner.scss'

export default class Spinner extends React.Component {

  _getClassName() {
    const { size, type } = this.props
    const classNames = [classes[size], classes[type]]
    return classNames.join(' ')
  }

  render() {
    return (
      <div className={classes.container}>
        <div className={this._getClassName()} />
      </div>
    )
  }
}
Spinner.propTypes = {
  size: React.PropTypes.oneOf([
    'default',
    'small'
  ]),
  type: React.PropTypes.oneOf([
    'constant',
    'infinite'
  ])
}
Spinner.defaultProps = {
  size: 'default',
  type: 'constant'
}

export default Spinner
