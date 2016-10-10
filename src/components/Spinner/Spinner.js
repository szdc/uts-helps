import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export default class Spinner extends React.Component {

  /**
   * Renders the spinner.
   *
   * @returns {XML}
   */
  render() {
    const sizes = {
      default: 0.85,
      dialog: 0.75,
      small: 0.35
    }

    return (
      <CircularProgress
        className='spinner'
        size={sizes[this.props.size]}
        style={{margin: '5px', verticalAlign: 'middle'}}
      />
    )
  }
}
Spinner.propTypes = {
  size: React.PropTypes.oneOf([
    'default',
    'dialog',
    'small'
  ])
}
Spinner.defaultProps = {
  size: 'default'
}
