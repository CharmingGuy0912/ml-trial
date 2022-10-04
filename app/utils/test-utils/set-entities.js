import {act} from '@testing-library/react'

import {actions} from '@/modules/entities'

const setEntities = (store, entities = {}) => {
  act(() => {
    store.dispatch(actions.entitiesLoaded({entities}))
  })
}

export default setEntities
