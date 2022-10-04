import {ControlledMenu, useMenuState} from '@szhsin/react-menu'
import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useRef} from 'react'

import animation from '@/utils/menu-animation.module.css'

import NavigationMenuContext from './context'

const getMenuClassName =
  extraClasses =>
    ({state}) =>
      classNames(
        'shadow bg-white px-1.5 py-2.5 border-0 rounded-bl min-w-[134px] space-y-1',
        {'pointer-events-none': ['closing', 'closed'].includes(state)},
        animation.slideReverse,
        extraClasses
      )

const NavigationMenu = props => {
  const buttonRef = useRef(null)
  const menuRef = useRef(null)
  const openByKeyboard = useRef(false)
  const [menuProps, toggleMenu] = useMenuState({transition: true})

  const openMenu = () => toggleMenu(true)

  const closeMenu = () => {
    toggleMenu(false)

    if (openByKeyboard.current) {
      buttonRef.current?.focus?.()
    }

    openByKeyboard.current = false
  }

  const onButtonMouseLeave = event => {
    if (
      !event.relatedTarget?.nodeType ||
      !menuRef.current?.contains(event.relatedTarget)
    ) {
      closeMenu()
    }
  }

  const onMenuMouseLeave = event => {
    if (
      !event.relatedTarget?.nodeType ||
      !buttonRef.current?.contains(event.relatedTarget)
    ) {
      closeMenu()
    }
  }

  const onButtonKeyDown = event => {
    if (['ArrowDown', 'ArrowUp'].includes(event.code)) {
      openByKeyboard.current = true
      openMenu()
    }
  }

  return (
    <>
      {props.menuButton({
        isOpen: ['opening', 'open'].includes(menuProps.state),
        onKeyDown: onButtonKeyDown,
        onMouseEnter: openMenu,
        onMouseLeave: onButtonMouseLeave,
        ref: buttonRef
      })}

      <ControlledMenu
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...menuProps}
        menuClassName={getMenuClassName()}
        ref={menuRef}
        anchorRef={buttonRef}
        onMouseLeave={onMenuMouseLeave}
        onClose={closeMenu}
        submenuCloseDelay={0}
        submenuOpenDelay={0}
        portal
        transition
      >
        <NavigationMenuContext.Provider value={{closeMenu}}>
          {props.children}
        </NavigationMenuContext.Provider>
      </ControlledMenu>
    </>
  )
}

NavigationMenu.propTypes = {
  children: PropTypes.node,
  menuButton: PropTypes.func
}

NavigationMenu.defaultProps = {
  children: null,
  menuButton: noop
}

export {getMenuClassName}
export default NavigationMenu
