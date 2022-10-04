import CreateEventModal from '@/components/organisms/CreateEventModal'
import RoutedModalProvider from '@/components/organisms/RoutedModal/Provider'
import MODAL_ROUTES from '@/components/routes/modal-routes'
import EventTypeMatch from '@/contexts/EventType/EventTypeMatch'

const createRoutes = basePath => [
  {
    element: (
      <RoutedModalProvider>
        <EventTypeMatch match={`${basePath}/${MODAL_ROUTES.EVENTS.CREATE}`}>
          <CreateEventModal />
        </EventTypeMatch>
      </RoutedModalProvider>
    ),
    path: MODAL_ROUTES.EVENTS.CREATE
  }
]

export default createRoutes
