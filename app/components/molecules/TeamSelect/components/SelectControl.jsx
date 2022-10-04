import classNames from 'classnames'
import PropTypes from 'prop-types'

import Control from '@/components/atoms/ComboBox/components/Control'

/* eslint-disable react/jsx-props-no-spreading */
const SelectControl = ({children, className, ...props}) => (
  <Control
    className={classNames(
      '!rounded-full !border-white !bg-transparent h-[27px]',
      {
        '!rounded-b-full': props.menuIsOpen,
        'hover:!border-white hover:!bg-transparent hover:!shadow-md':
          !props.isFocused
      },
      className
    )}
    {...props}
  >
    {children}
  </Control>
)
/* eslint-enable */

SelectControl.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  isFocused: PropTypes.bool,
  menuIsOpen: PropTypes.bool
}

SelectControl.defaultProps = {
  className: null,
  isDisabled: false,
  isFocused: false,
  menuIsOpen: false
}

export default SelectControl
