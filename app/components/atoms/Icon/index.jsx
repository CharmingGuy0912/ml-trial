import classNames from 'classnames'
import PropTypes from 'prop-types'

const Icon = ({component: Component, className, ...props}) => (
  <Component
    className={classNames(
      'fill-current w-[1em] h-[1em] inline-block',
      className
    )}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

Icon.propTypes = {
  className: PropTypes.any,
  component: PropTypes.elementType.isRequired
}

Icon.defaultProps = {
  className: null
}

export default Icon
