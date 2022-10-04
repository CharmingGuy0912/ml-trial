import {useCallback, useEffect} from 'react'
import {useDispatch} from 'react-redux'

import useMemoizedSelector from '@/hooks/use-memoized-selector'
import {actions, selectors} from '@/modules/event/results'

const DEFAULT_ID = 'default'

const useState = id => ({
  entities: useMemoizedSelector(selectors.makeSelectResultEntities, {id}),
  error: useMemoizedSelector(selectors.makeSelectError, {id}),
  events: useMemoizedSelector(selectors.makeSelectResult, {id}),
  isLoading: useMemoizedSelector(selectors.makeSelectIsLoading, {id}),
  total: useMemoizedSelector(selectors.makeSelectTotal, {id})
})

const useEvents = (id, filter) => {
  const dispatch = useDispatch()

  return {
    onLoad: useCallback(
      // eslint-disable-next-line sort-keys
      (offset = 0) => dispatch(actions.load({id, offset, filter})),
      [id, filter]
    ),
    onReset: useCallback(() => {
      dispatch(actions.reset({id}))
    }, [id])
  }
}

const useEventResults = ({id = DEFAULT_ID, shouldLoadOnMount = false, filter}) => {
  const state = useState(id)
  const events = useEvents(id, filter)

  useEffect(() => {
    if (shouldLoadOnMount) {
      events.onLoad()
    }

    return () => {
      events.onReset()
    }
  }, [shouldLoadOnMount, filter])

  return [state, events]
}

export default useEventResults
