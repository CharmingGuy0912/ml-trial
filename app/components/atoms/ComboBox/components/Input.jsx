import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const Input = ({children, className, ...props}) => (
  <components.Input
    className={classNames('!m-0 !p-0 !text-gray-dark', className)}
    {...props}
  >
    {children}
  </components.Input>
)
/* eslint-enable */

Input.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Input.defaultProps = {
  children: null,
  className: null
}

export default Input
