import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const ValueContainer = ({children, className, ...props}) => (
  <components.ValueContainer
    className={classNames('!py-0 !px-0', {'h-fit': props.isMulti}, className)}
    {...props}
  >
    {children}
  </components.ValueContainer>
)
/* eslint-enable */

ValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isMulti: PropTypes.bool
}

ValueContainer.defaultProps = {
  className: null,
  isMulti: false
}

export default ValueContainer
