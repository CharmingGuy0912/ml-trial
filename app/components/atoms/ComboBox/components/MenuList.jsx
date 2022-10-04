import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const MenuList = ({children, className, ...props}) => (
  <components.MenuList className={classNames('!p-0', className)} {...props}>
    {children}
  </components.MenuList>
)
/* eslint-enable */

MenuList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

MenuList.defaultProps = {
  className: null
}

export default MenuList
