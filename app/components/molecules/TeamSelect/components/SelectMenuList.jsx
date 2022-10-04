import classNames from 'classnames'
import PropTypes from 'prop-types'

import MenuList from '@/components/atoms/ComboBox/components/MenuList'

/* eslint-disable react/jsx-props-no-spreading */
const SelectMenuList = ({children, ...props}) => (
  <MenuList className={classNames('!rounded-t')} {...props}>
    {children}
  </MenuList>
)
/* eslint-enable */

SelectMenuList.propTypes = {
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
  menuIsOpen: PropTypes.bool
}

SelectMenuList.defaultProps = {
  isFocused: false,
  menuIsOpen: false
}

export default SelectMenuList
