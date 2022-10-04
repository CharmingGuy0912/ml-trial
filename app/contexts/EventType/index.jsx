import PropTypes from 'prop-types'
import {useMemo} from 'react'

import EventTypeContext from '@/contexts/EventType/context'
import {AVAILABLE_EVENT_TYPES} from '@/modules/event/results/types'

const EventType = ({children, ...props}) => {
  const value = useMemo(
    () => ({
      type: props.type
    }),
    [props.type]
  )

  return (
    <EventTypeContext.Provider value={value}>
      {children}
    </EventTypeContext.Provider>
  )
}

EventType.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(AVAILABLE_EVENT_TYPES).isRequired
}

export default EventType
