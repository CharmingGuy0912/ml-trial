import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const Placeholder = ({children, className, ...props}) => (
  <components.Placeholder
    className={classNames(
      '!m-0 specific:text-gray-medium line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
  </components.Placeholder>
)
/* eslint-enable */

Placeholder.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Placeholder.defaultProps = {
  children: null,
  className: null
}

export default Placeholder
