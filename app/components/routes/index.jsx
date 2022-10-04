import HomePage from '@/components/pages/HomePage/Loadable'
import NotFoundPage from '@/components/pages/NotFoundPage'
import PageHusk from '@/components/pages/PageHusk'

import trainingPlanRoutes from './training-plan'

const ROUTE_IDS = {
  HOME: 'home',
  BASIC_AUTH_TRIGGER: 'basic-auth-trigger'
}

const routes = [
  {
    id: ROUTE_IDS.HOME,
    path: '/',
    element: <PageHusk />,
    children: [
      ...trainingPlanRoutes,
      {
        id: 'root',
        path: '/',
        element: <HomePage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]

export {ROUTE_IDS}
export default routes
