// istanbul ignore file
import {useContext, useEffect} from 'react'

import ActionSubscriptionContext from './context'

const useActionSubscription = (actionMap, identifier) => {
  const context = useContext(ActionSubscriptionContext)

  useEffect(() => {
    Object.keys(actionMap).forEach(actionType => {
      context.addSubscriber(actionType, actionMap[actionType], identifier)
    })

    return () => {
      Object.keys(actionMap).forEach(actionType => {
        context.removeSubscriber(actionType, identifier)
      })
    }
  }, [])
}

export default useActionSubscription
