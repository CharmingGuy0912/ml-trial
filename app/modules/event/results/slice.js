import {createSelector, createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import {selectors as entitiesSelectors} from '@/modules/entities'
import createResultsActions, {
  addResultsMatchers,
  initialResultsState
} from '@/modules/utils/results/create-results-actions'
import createResultsSelectors from '@/modules/utils/results/create-results-selectors'

const scope = 'eventResults'
const initialState = deepFreeze({
  ...initialResultsState
  // Add custom fields here
})


const resultsActions = createResultsActions({scope})
const actions = {
  ...resultsActions,
  // Add custom actions here
}

const resultSelectors = createResultsSelectors({initialState, scope})
const selectResultEntities = createSelector(
  resultSelectors.selectResult,
  entitiesSelectors.selectEventEntities,
  (ids, entities) => ids.map(id => entities[id])
)
const makeSelectResultEntities = () => selectResultEntities
const selectors = {
  ...resultSelectors,
  makeSelectResultEntities,
  selectResultEntities,
  // Add custom selectors here
}

const slice = createSlice({
  extraReducers: builder => {
    addResultsMatchers({
      builder,
      scope
    })
  },
  initialState,
  name: scope
})

export {actions, scope, selectors}
export default {
  key: scope,
  reducer: slice.reducer
}
