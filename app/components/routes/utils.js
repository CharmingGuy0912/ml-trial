import trim from 'lodash/trim'

import routes from '@/components/routes'
import {notEmpty} from '@/utils/filter-utils'

const splitPathIds = ids => {
  if (Array.isArray(ids)) {
    return ids
  }
  return ids.split('.')
}

const getPathById = pathIds => {
  const ids = splitPathIds(pathIds)

  try {
    const {paths} = ids.reduce(
      (acc, id) => {
        const route = acc.currentLevel.find(child => child.id === id)

        return {
          currentLevel: route.children,
          paths: [...acc.paths, route.path]
        }
      },
      {
        currentLevel: routes,
        paths: []
      }
    )

    return `/${paths
      .map(path => trim(path, '/'))
      .filter(notEmpty)
      .join('/')}`
  } catch (error) {
    return null
  }
}

const createModalPath = (route, params = {}) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, value),
    route
  )

export {createModalPath, getPathById}
