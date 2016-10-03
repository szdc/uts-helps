import React from 'react'

import CenterLayout from 'layouts/CenterLayout'
import Spinner from 'components/Spinner'

/**
 * Renders a vertically and horizontally centered loading spinner.
 *
 * @constructor
 */
const Loading = () => (
  <CenterLayout>
    <Spinner />
  </CenterLayout>
)
export default Loading
