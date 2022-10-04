import {useRouter} from '@tanstack/react-location'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'

import NavigationBar, {LEVELS} from './Bar'
import MENU from './dummy-menu'

const findSubMenu = (menu, path) =>
  menu?.find(item => item.path === path) ?? null

const findActiveSubMenu = (menu, path, subPath) => {
  const subMenu = findSubMenu(menu, path)

  if (findSubMenu(subMenu?.children, subPath)) {
    return subMenu.children
  }

  return null
}

const Navigation = props => {
  const router = useRouter()
  const [firstLevelPath, secondLevelPath, thirdLevelPath] = useMemo(
    () => router.state.location.pathname.split('/').filter(Boolean),
    [router.state.location]
  )
  const secondLevelMenu = useMemo(
    () => findActiveSubMenu(MENU, firstLevelPath, secondLevelPath),
    [firstLevelPath, secondLevelPath]
  )
  const thirdLevelMenu = useMemo(
    () => findActiveSubMenu(secondLevelMenu, secondLevelPath, thirdLevelPath),
    [secondLevelPath, secondLevelMenu, thirdLevelPath]
  )

  return (
    <>
      <NavigationBar
        cta={props.cta}
        items={MENU}
        level={LEVELS.ONE}
        settings={props.settings}
      />
      {Boolean(secondLevelMenu) && (
        <NavigationBar
          basePath={`/${firstLevelPath}/`}
          items={secondLevelMenu}
          level={LEVELS.TWO}
        />
      )}
      {Boolean(thirdLevelMenu) && (
        <NavigationBar
          basePath={`/${firstLevelPath}/${secondLevelPath}/`}
          items={thirdLevelMenu}
          level={LEVELS.THREE}
        />
      )}
    </>
  )
}

Navigation.propTypes = {
  cta: PropTypes.node,
  settings: PropTypes.node
}

Navigation.defaultProps = {
  cta: null,
  settings: null
}

export default React.memo(Navigation)
