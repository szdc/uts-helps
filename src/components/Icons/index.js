import React from 'react'
import IconButton from 'material-ui/IconButton'

/**
 * Represents a Material Design icon.
 */
class Icon extends React.Component {

  /**
   * Renders the component.
   * @returns {XML}
   */
  render() {
    // Ensure the class "material-icons" is present
    const { className, displayAsButton, name } = this.props
    let iconClass = `${this.props.iconClass || 'material-icons'} ${className || ''}`

    let containerProps = {
      ...this.props
    }
    delete containerProps.buttonStyle
    delete containerProps.displayAsButton
    delete containerProps.iconClass
    delete containerProps.name

    const buttonStyle = {
      ...this.props.style,
      ...this.props.buttonStyle
    }

    return displayAsButton
      ? <IconButton {...containerProps} style={buttonStyle}><i className={iconClass}>{name}</i></IconButton>
      : <i {...containerProps} className={iconClass}>{name}</i>
  }
}
Icon.propTypes = {
  buttonStyle: React.PropTypes.object,
  className: React.PropTypes.string,
  displayAsButton: React.PropTypes.bool,
  iconClass: React.PropTypes.string,
  name: React.PropTypes.string,
  style: React.PropTypes.object
}
Icon.defaultProps = {
  displayAsButton: false,
  buttonStyle: {},
  style: {}
}

const createIcon = (props, name) =>
  <Icon
    {...props}
    name={name}
  />

export const IconAdd = props =>
  createIcon(props, 'add')

export const IconBack = props =>
  createIcon(props, 'arrow_back')

export const IconCancel = props =>
  createIcon(props, 'not_interested')

export const IconCheck = props =>
  createIcon(props, 'check')

export const IconChecked = props =>
  createIcon(props, 'check_circle')

export const IconChevronDown = props =>
  createIcon(props, 'keyboard_arrow_down')

export const IconChevronUp = props =>
  createIcon(props, 'keyboard_arrow_up')

export const IconClose = props =>
  createIcon(props, 'close')

export const IconDate = props =>
  createIcon(props, 'date_range')

export const IconDelete = props =>
  createIcon(props, 'delete')

export const IconDownload = props =>
  createIcon(props, 'file_download')

export const IconEdit = props =>
  createIcon(props, 'mode_edit')

export const IconEmail = props =>
  createIcon(props, 'email')

export const IconErrorOutline = props =>
  createIcon(props, 'error_outline')

export const IconLogout = props =>
  createIcon(props, 'exit_to_app')

export const IconMenu = props =>
  createIcon(props, 'menu')

export const IconOptions = props =>
  createIcon(props, 'more_vert')

export const IconPlace = props =>
  createIcon(props, 'place')

export const IconPlaceholder = props =>
  createIcon({...props, disabled: true}, '')

export const IconSearch = props =>
  createIcon(props, 'search')

export const IconSettings = props =>
  createIcon(props, 'settings')

