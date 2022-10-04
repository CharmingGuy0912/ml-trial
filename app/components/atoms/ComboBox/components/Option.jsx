import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const Option = ({children, className, ...props}) => (
  <components.Option
    className={classNames(
      '!py-1.5 !px-3 border-b border-b-divider/30 last:border-b-0 last:rounded-b',
      {
        '!bg-primary !text-white': props.isSelected,
        '!bg-silver !text-gray-dark': props.isFocused && !props.isSelected,
        '!text-gray-medium': props.isDisabled
      },
      className
    )}
    {...props}
  >
    {props.data?.node || children}
  </components.Option>
)

/* eslint-enable */

Option.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  data: PropTypes.shape({
    node: PropTypes.node
  }),
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
}

Option.defaultProps = {
  className: null,
  data: {},
  isDisabled: false,
  isFocused: false,
  isSelected: false
}

export default Option
