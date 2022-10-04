import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const Menu = ({children, className, ...props}) => (
  <components.Menu
    className={classNames('!m-0 !rounded-t-none !shadow', className)}
    {...props}
  >
    {children}
  </components.Menu>
)
/* eslint-enable */

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

Menu.defaultProps = {
  className: null
}

export default Menu
