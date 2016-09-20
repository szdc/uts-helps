import React from 'react'
import { connect } from 'react-redux'
import { goBack } from 'react-router-redux'
import Header from 'components/Header'

const HeaderContainer = props => (
  <Header
    {...props}
    onBackButtonClick={props.onBackButtonClick || props.goBack}
  />
)
HeaderContainer.propTypes = {
  goBack: React.PropTypes.func.isRequired,
  onBackButtonClick: React.PropTypes.func
}

const mapDispatchToProps = {
  goBack
}

export default connect(null, mapDispatchToProps)(HeaderContainer)
