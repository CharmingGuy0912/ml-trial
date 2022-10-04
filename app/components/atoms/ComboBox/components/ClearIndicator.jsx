import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import CloseIcon from '@/components/atoms/Icon/Close'

/* eslint-disable react/jsx-props-no-spreading */
const ClearIndicator = ({className, ...props}) => (
  <components.ClearIndicator
    className={classNames(
      'text-2xl !py-1 text-gray-medium hover:!text-gray-dark/50 hover:cursor-pointer !px-0',
      className
    )}
    {...props}
  >
    <CloseIcon />
  </components.ClearIndicator>
)
/* eslint-enable */

ClearIndicator.propTypes = {
  className: PropTypes.string
}

ClearIndicator.defaultProps = {
  className: null
}

export default ClearIndicator
