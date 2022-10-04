import classNames from 'classnames'
import PropTypes from 'prop-types'

import NavigationItem from '@/components/atoms/NavigationItem'

import NavigationMenu from '../NavigationMenu'
import NavigationMenuItem from '../NavigationMenu/Item'
import NavigationSubMenu from '../NavigationMenu/SubMenu'

/* eslint-disable sort-keys */
const LEVELS = {
  ONE: 'one',
  TWO: 'two',
  THREE: 'three'
}
/* eslint-enable sort-keys */

const NavigationBar = props => {
  const className = classNames(
    'flex justify-center overflow-hidden order-last lg:order-2'
  )

  return (
    <nav
      className={classNames(
        'flex justify-center flex-1 flex-col lg:flex-row',
        'z-10',
        {
          'pt-1 bg-gradient-to-l bg-gradient-primary':
            props.level === LEVELS.ONE,
          'pt-[3px] bg-gray-light': props.level === LEVELS.TWO,
          'py-[3px] bg-white': props.level === LEVELS.THREE
        }
      )}
    >
      {props.cta}
      <div className={className}>
        {props.items.map(item => {
          if (item.children?.length) {
            return (
              <NavigationMenu
                key={item.label}
                menuButton={({
                  isOpen,
                  onKeyDown,
                  onMouseEnter,
                  onMouseLeave,
                  ref
                }) => (
                  <NavigationItem
                    hasSublevel={props.level !== LEVELS.ONE}
                    isDisabled={item.folder}
                    isOpen={isOpen}
                    level={props.level}
                    onKeyDown={onKeyDown}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    ref={ref}
                    to={`${props.basePath}${item.path}`}
                  >
                    {item.label}
                  </NavigationItem>
                )}
              >
                {item.children.map(child => {
                  if (child.children?.length) {
                    return (
                      <NavigationSubMenu
                        key={child.label}
                        to={`${props.basePath}${item.path}/${child.path}`}
                        isLabelDisabled={child.folder}
                        label={child.label}
                      >
                        {child.children.map(grandchild => (
                          <NavigationMenuItem
                            isDisabled={grandchild.folder}
                            key={grandchild.label}
                            to={`${props.basePath}${item.path}/${child.path}/${grandchild.path}`}
                          >
                            {grandchild.label}
                          </NavigationMenuItem>
                        ))}
                      </NavigationSubMenu>
                    )
                  }
                  return (
                    <NavigationMenuItem
                      isDisabled={child.folder}
                      key={child.label}
                      to={`${props.basePath}${item.path}/${child.path}`}
                    >
                      {child.label}
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenu>
            )
          }

          return (
            <NavigationItem
              key={item.label}
              level={props.level}
              to={`${props.basePath}${item.path}`}
            >
              {item.label}
            </NavigationItem>
          )
        })}
      </div>
      {props.settings}
    </nav>
  )
}

NavigationBar.propTypes = {
  basePath: PropTypes.string,
  cta: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.array,
      folder: PropTypes.bool,
      label: PropTypes.string,
      path: PropTypes.string
    })
  ),
  level: PropTypes.oneOf(Object.values(LEVELS)),
  settings: PropTypes.node
}

NavigationBar.defaultProps = {
  basePath: '/',
  cta: null,
  items: [],
  level: LEVELS.ONE,
  settings: null
}

export {LEVELS}
export default NavigationBar
