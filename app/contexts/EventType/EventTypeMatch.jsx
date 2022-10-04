import {useMatchRoute} from '@tanstack/react-location'
import PropTypes from 'prop-types'

import EventType from '@/contexts/EventType/index'
import {AVAILABLE_EVENT_TYPES} from '@/modules/event/results/types'

const EventTypeMatch = ({children, match}) => {
  const matchRoute = useMatchRoute()
  const params = matchRoute({to: match})

  if (!AVAILABLE_EVENT_TYPES.includes(params?.type)) {
    return null
  }

  return <EventType type={params.type}>{children}</EventType>
}

EventTypeMatch.propTypes = {
  children: PropTypes.node.isRequired,
  match: PropTypes.string.isRequired
}

export default EventTypeMatch
