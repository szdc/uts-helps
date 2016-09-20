import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { logout } from '../modules/logout'

import Logout from '../components/Logout'

const mapDispatchToProps = {
  logout: () => logout(),
  navigateTo: (path) => push(path)
}

export default connect(null, mapDispatchToProps)(Logout)
