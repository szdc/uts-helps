import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import classes from './Spinner.scss'

export default class Spinner extends React.Component {

  _getClassName() {
    const { size, type } = this.props
    const classNames = [classes[size], classes[type]]
    return classNames.join(' ')
  }

  render() {
    const sizes = {
      default: 0.85,
      small: 0.35
    }

    return (
      <CircularProgress
        className='spinner'
        size={sizes[this.props.size]}
        style={{margin: '5px'}}
      />
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
