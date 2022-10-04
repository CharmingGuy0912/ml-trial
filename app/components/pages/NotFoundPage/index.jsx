import {useRouter} from '@tanstack/react-location'
import {useMemo} from 'react'
import {FormattedMessage} from 'react-intl'

import dummyMenu from '@/components/molecules/Navigation/dummy-menu'
import PageHeader from '@/components/molecules/PageHeader'

import messages from './messages'

const traverseMenu = (pathParts, menu = dummyMenu) => {
  const menuItem = menu.find(item => item.path === pathParts[0])
  const pathPartsRest = pathParts.slice(1)

  if (menuItem) {
    if (pathPartsRest.length) {
      return traverseMenu(pathPartsRest, menuItem.children ?? [])
    }

    return menuItem
  }

  return null
}

const NotFoundPage = () => {
  const router = useRouter()
  const pathParts = useMemo(
    () => router.state.location.pathname.split('/').filter(Boolean),
    [router.state.location]
  )
  const activeMenuItem = traverseMenu(pathParts)

  if (activeMenuItem?.label) {
    return <PageHeader title={activeMenuItem.label} />
  }

  return (
    <div className="flex justify-center items-center h-full font-page-heading text-6xl text-primary">
      <FormattedMessage {...messages.notFound} />
    </div>
  )
}

export default NotFoundPage
