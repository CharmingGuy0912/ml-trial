import {createAction, createSelector, createSlice} from '@reduxjs/toolkit'
import {toString} from 'lodash'
import get from 'lodash/get'

import {selectId} from '@/modules/utils/common-selectors'

const scope = 'entities'
const initialState = {}

const FALLBACK = {}

const selectEntities = state => get(state, scope, initialState)

const createEntitiesSelector = key =>
  createSelector(selectEntities, entities => entities?.[key] ?? FALLBACK)

const createEntitySelector = key =>
  createSelector(
    selectEntities,
    selectId,
    (entities, id) => entities?.[key]?.[id] ?? FALLBACK
  )

const createCommonEntitySelectors = key => {
  const selectAllEntities = createEntitiesSelector(key)
  const selectSingleEntity = createEntitySelector(key)
  const makeSelectSingleEntity = () => selectSingleEntity

  return [selectAllEntities, selectSingleEntity, makeSelectSingleEntity]
}

const [selectEventEntities, selectEventEntity, makeSelectEventEntity] =
  createCommonEntitySelectors('events')

const [
  selectTrainingEventEntities,
  selectTrainingEventEntity,
  makeSelectTrainingEventEntity
] = createCommonEntitySelectors('trainingEvents')

const [selectExerciseEntities, selectExerciseEntity, makeSelectExerciseEntity] =
  createCommonEntitySelectors('exercises')

const [selectTeams, selectTeamEntity, makeSelectTeamEntity] =
  createCommonEntitySelectors('teams')

const [
  selectSpeedTestEntities,
  selectSpeedTestEntity,
  makeSelectSpeedTestEntity
] = createCommonEntitySelectors('speedTests')

const [selectAthletes, selectAthleteEntity, makeSelectAthleteEntity] =
  createCommonEntitySelectors('athletes')

const makeSelectTrainingByEventId = () =>
  createSelector(selectId, selectTrainingEventEntities, (eventId, entities) => {
    const trainingEvents = Object.values(entities)
    const findById = id => item => toString(item.eventId) === id

    return (
      trainingEvents[trainingEvents.findIndex(findById(eventId))] || FALLBACK
    )
  })

const entitiesLoaded = createAction(`${scope}/entitiesLoaded`)
const entitiesDeleted = createAction(`${scope}/entitiesDeleted`)

const actions = {entitiesDeleted, entitiesLoaded}
const selectors = {
  makeSelectAthleteEntity,
  makeSelectEventEntity,
  makeSelectExerciseEntity,
  makeSelectSpeedTestEntity,
  makeSelectTeamEntity,
  makeSelectTrainingByEventId,
  makeSelectTrainingEventEntity,
  selectAthleteEntity,
  selectAthletes,
  selectEventEntities,
  selectEventEntity,
  selectExerciseEntities,
  selectExerciseEntity,
  selectSpeedTestEntities,
  selectSpeedTestEntity,
  selectTeamEntity,
  selectTeams,
  selectTrainingEventEntities,
  selectTrainingEventEntity
}

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(entitiesLoaded, (state, action) => {
        const {mergeEntities = true} = action.payload

        Object.entries(action.payload.entities).forEach(([type, entities]) => {
          if (!state[type]) {
            state[type] = {}
          }
          Object.entries(entities).forEach(([id, entity]) => {
            const shouldOverwriteEntity = !mergeEntities
            const isMissingEntity = mergeEntities && !state[type][id]
            if (isMissingEntity || shouldOverwriteEntity) {
              state[type][id] = {}
            }
            Object.entries(entity).forEach(([key, value]) => {
              state[type][id][key] = value
            })
          })
        })
      })
      .addCase(entitiesDeleted, (state, action) => {
        Object.entries(action.payload.entities).forEach(([type, ids]) => {
          if (state[type]) {
            ids.forEach(id => {
              delete state[type][id]
            })
          }
        })
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
