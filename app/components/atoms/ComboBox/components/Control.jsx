import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const Control = ({children, className, ...props}) => (
  <components.Control
    className={classNames(
      '!min-h-0 !rounded-1 !transition-shadow pl-3 gap-1.5',
      {
        '!bg-surface !border-transparent !shadow': props.isFocused,
        '!bg-transparent !border-gray-medium hover:!border-surface hover:!bg-silver hover:!shadow-md':
          !props.isFocused,
        '!rounded-b-none': props.menuIsOpen,
        'h-[28px] pl-2.5': props.isMulti
      },
      className
    )}
    {...props}
  >
    {children}
  </components.Control>
)
/* eslint-enable */

Control.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  isMulti: PropTypes.bool,
  menuIsOpen: PropTypes.bool
}

Control.defaultProps = {
  className: null,
  isFocused: false,
  isMulti: false,
  menuIsOpen: false
}

export default Control
