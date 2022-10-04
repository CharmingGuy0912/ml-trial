import {MenuItem} from '@szhsin/react-menu'
import {Link} from '@tanstack/react-location'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useRef} from 'react'

// prettier-ignore
const getItemClassName =
  ({extraClasses, textColor = 'text-primary'} = {}) =>
    ({hover}) =>
      classNames(
        'font-bold text-[11px] leading-[13px] rounded',
        'transition-colors motion-reduce:transition-none',
        'focus:bg-red',
        {
          'bg-primary text-white': hover,
          [textColor]: !hover
        },
        extraClasses
      )

const NavigationMenuItem = ({children, isDisabled, to, ...props}) => {
  const linkRef = useRef(null)

  const onKeyUp = event => {
    if (event.code === 'Enter' && !isDisabled) {
      linkRef.current.click?.()
    }
  }

  return (
    <MenuItem
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      className={getItemClassName()}
      onKeyUp={onKeyUp}
    >
      <Link
        className="block px-1.5 py-[3px]"
        disabled={isDisabled}
        to={to}
        _ref={linkRef}
      >
        {children}
      </Link>
    </MenuItem>
  )
}

NavigationMenuItem.propTypes = {
  children: PropTypes.node,
  isDisabled: PropTypes.bool,
  to: PropTypes.string
}

NavigationMenuItem.defaultProps = {
  children: null,
  isDisabled: false,
  to: null
}

export {getItemClassName}
export default NavigationMenuItem
