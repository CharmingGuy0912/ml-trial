import classNames from 'classnames'
import PropTypes from 'prop-types'

import BUTTON_SIZES from './sizes'

const IconHolder = props => {
  if (!props.children) {
    return null
  }

  return (
    <div
      className={classNames({
        flex: true,
        'text-lg': props.size === BUTTON_SIZES.MEDIUM
      })}
    >
      {props.children}
    </div>
  )
}

IconHolder.propTypes = {
  children: PropTypes.node,
  isLonely: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)).isRequired
}

IconHolder.defaultProps = {
  children: null,
  isLonely: false
}

export default IconHolder
