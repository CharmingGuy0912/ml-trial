import classNames from 'classnames'
import PropTypes from 'prop-types'

import DropdownIndicator from '@/components/atoms/ComboBox/components/DropdownIndicator'

/* eslint-disable react/jsx-props-no-spreading */
const SelectIndicator = props => (
  <DropdownIndicator
    className={classNames('!text-white !pr-[7px] !pl-0 !py-0', {
      'rotate-180 !pr-0 !pl-[7px] !text-white': props.selectProps.menuIsOpen
    })}
    {...props}
  />
)
/* eslint-enable */

SelectIndicator.propTypes = {
  isFocused: PropTypes.bool,
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool
  })
}

SelectIndicator.defaultProps = {
  isFocused: false,
  selectProps: {}
}

export default SelectIndicator
