import isEqual from 'lodash/isEqual'
import {useEffect, useState} from 'react'

const useSyncState = prop => {
  const [state, setState] = useState(prop)

  useEffect(() => {
    if (!isEqual(prop, state)) {
      setState(prop)
    }
  }, [prop])

  return [state, setState]
}

export default useSyncState
