import {Link} from '@tanstack/react-location'
import classNames from 'classnames'
import {noop} from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

import ArrowDropDownIcon from '@/components/atoms/Icon/ArrowDropDown'

/* eslint-disable sort-keys */
const LEVELS = {
  ONE: 'one',
  TWO: 'two',
  THREE: 'three'
}
/* eslint-enable sort-keys */

const getLevelClasses = ({isDisabled, isOpen, level}) => {
  const CLASSES = {
    [LEVELS.ONE]: [
      'text-[13px] leading-[15px] text-white px-3 pt-2.5 pb-[11px] rounded-t',
      'focus-visible:ring-white',
      'hover:text-primary hover:bg-white hover:shadow',
      {'text-primary bg-white shadow': isOpen}
    ],
    [LEVELS.TWO]: [
      'text-[11px] leading-[13px] text-gray-dark px-2.5 pt-[5px] pb-[7px] rounded-t',
      {
        'text-gray-dark': isDisabled,
        'text-primary': !isDisabled
      },
      'focus-visible:ring-primary',
      'hover:bg-white hover:shadow',
      {'bg-white shadow': isOpen}
    ],
    [LEVELS.THREE]: [
      'text-[11px] leading-[13px] text-primary px-2.5 pt-1 pb-[5px] rounded',
      'focus-visible:ring-primary',
      'hover:bg-silver'
    ]
  }

  return CLASSES[level]
}

const NavigationItem = React.forwardRef((props, ref) => (
  <Link
    className={classNames(
      'font-bold inline-flex flex-col transition motion-reduce:transition-none',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset',
      {'cursor-default': props.isDisabled},
      getLevelClasses(props)
    )}
    tabIndex="0"
    to={props.to}
    disabled={props.isDisabled}
    onClick={props.onClick}
    onKeyDown={props.onKeyDown}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
    _ref={ref}
  >
    {({isActive}) => (
      <>
        <div className="flex items-center">
          {props.children}
          {props.hasSublevel && <ArrowDropDownIcon className="text-lg" />}
        </div>

        <div className="relative">
          <div
            className={classNames(
              'w-full absolute top h-[2px] left-0 right-0 top-0 rounded-full bg-current',
              'motion-reduce:transition-none transition-[opacity,transform]',
              {
                'mt-px': props.level === LEVELS.ONE,
                'opacity-0 translate-y-0.5': !isActive,
                'opacity-100 translate-y-0': isActive
              }
            )}
          />
        </div>
      </>
    )}
  </Link>
))

NavigationItem.displayName = 'NavigationItem'

NavigationItem.propTypes = {
  children: PropTypes.node,
  hasSublevel: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  level: PropTypes.oneOf(Object.values(LEVELS)),
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  to: PropTypes.string
}

NavigationItem.defaultProps = {
  children: null,
  hasSublevel: false,
  isDisabled: false,
  isOpen: false,
  level: LEVELS.ONE,
  onClick: noop,
  onKeyDown: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  to: null
}

export {LEVELS}
export default NavigationItem
