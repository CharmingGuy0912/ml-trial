import classNames from 'classnames'
import PropTypes from 'prop-types'

import Menu from '@/components/atoms/ComboBox/components/Menu'

/* eslint-disable react/jsx-props-no-spreading */
const SelectMenu = ({children, ...props}) => (
  <Menu className={classNames('!rounded-t')} {...props}>
    {children}
  </Menu>
)
/* eslint-enable */

SelectMenu.propTypes = {
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.bool,
  menuIsOpen: PropTypes.bool
}

SelectMenu.defaultProps = {
  isFocused: false,
  menuIsOpen: false
}

export default SelectMenu
