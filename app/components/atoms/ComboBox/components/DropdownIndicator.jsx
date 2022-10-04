import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import ArrowDropDownIcon from '@/components/atoms/Icon/ArrowDropDown'

/* eslint-disable react/jsx-props-no-spreading */
const DropdownIndicator = ({className, ...props}) => (
  <components.DropdownIndicator
    className={classNames(
      'text-2xl !px-3 !py-1',
      {
        '!text-gray-dark': props.isFocused,
        '!text-gray-medium': !props.isFocused,
        'rotate-180': props.selectProps.menuIsOpen
      },
      className
    )}
    {...props}
  >
    <ArrowDropDownIcon />
  </components.DropdownIndicator>
)
/* eslint-enable */

DropdownIndicator.propTypes = {
  className: PropTypes.string,
  isFocused: PropTypes.bool,
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool
  })
}

DropdownIndicator.defaultProps = {
  className: null,
  isFocused: false,
  selectProps: {}
}

export default DropdownIndicator
