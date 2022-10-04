import {SubMenu} from '@szhsin/react-menu'
import {Link} from '@tanstack/react-location'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useMemo, useRef} from 'react'

import ArrowDropDownIcon from '@/components/atoms/Icon/ArrowDropDown'

import {getItemClassName} from './Item'
import {useNavigationMenuContext} from './context'

import {getMenuClassName} from './index'

const NavigationSubMenu = ({isLabelDisabled, label, to, ...props}) => {
  const linkRef = useRef(null)
  const subMenuRef = useRef(null)
  const {closeMenu} = useNavigationMenuContext()

  const labelTextColor = useMemo(() => {
    if (isLabelDisabled) {
      return 'text-gray-dark'
    }
    return 'text-primary'
  }, [isLabelDisabled])

  const onKeyUp = event => {
    if (event.code === 'Enter' && !isLabelDisabled) {
      linkRef.current.click?.()
      closeMenu()
    }

    if (['ArrowRight', 'Space'].includes(event.code)) {
      subMenuRef.current.openMenu?.('first')
    }
  }

  const onClick = () => {
    closeMenu()
  }

  const onMouseEnter = () => {
    subMenuRef.current.openMenu?.()
  }

  return (
    <SubMenu
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      instanceRef={subMenuRef}
      menuClassName={getMenuClassName('rounded-r')}
      itemProps={{
        className: getItemClassName({
          extraClasses: {'cursor-default': isLabelDisabled},
          textColor: labelTextColor
        }),
        onClick,
        onKeyUp,
        onMouseEnter
      }}
      offsetX={6}
      offsetY={-10}
      openTrigger="none"
      label={
        <Link
          className={classNames('flex place-content-between px-1.5 py-[3px]')}
          disabled={isLabelDisabled}
          tabIndex="-1"
          to={to}
          _ref={linkRef}
        >
          {label}
          <ArrowDropDownIcon className="text-lg -rotate-90 ml-1" />
        </Link>
      }
    />
  )
}

NavigationSubMenu.propTypes = {
  isLabelDisabled: PropTypes.bool,
  label: PropTypes.node,
  to: PropTypes.string
}

NavigationSubMenu.defaultProps = {
  isLabelDisabled: false,
  label: null,
  to: null
}

export default NavigationSubMenu
