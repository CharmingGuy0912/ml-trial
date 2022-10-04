import React, {useContext} from 'react'

const EventTypeContext = React.createContext({})

const useEventTypeContext = () => useContext(EventTypeContext)

export {useEventTypeContext}
export default EventTypeContext
