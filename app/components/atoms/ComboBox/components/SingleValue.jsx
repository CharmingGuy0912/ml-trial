import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const SingleValue = ({children, className, ...props}) => (
  <components.SingleValue
    className={classNames(
      '!m-0 !p-0 !text-gray-dark',
      {'!text-gray-medium': props.isDisabled},
      className
    )}
    {...props}
  >
    {props.data?.node || children}
  </components.SingleValue>
)
/* eslint-enable */

SingleValue.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape({
    node: PropTypes.node
  }),
  isDisabled: PropTypes.bool
}

SingleValue.defaultProps = {
  className: null,
  data: {},
  isDisabled: false
}

export default SingleValue
