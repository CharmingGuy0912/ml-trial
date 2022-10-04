import mockState from '@/utils/test-utils/mock-state'

import slice, {actions, scope, selectors} from '../slice'

const eventId = 'event-id-1'

describe('modules', () => {
  describe('entities slice', () => {
    describe('entitiesLoaded', () => {
      it('should update the entities according to the payload', () => {
        const entities = {events: {[eventId]: {id: eventId}}}
        const nextState = slice.reducer({}, actions.entitiesLoaded({entities}))
        expect(nextState).toEqual(entities)
      })

      it('should replace nested fields', () => {
        const mockedState = {
          events: {[eventId]: {id: eventId, title: 'Event Title 1'}}
        }
        const entities = {
          events: {[eventId]: {id: eventId, title: 'Event Title 2'}}
        }
        const nextState = slice.reducer(
          mockedState,
          actions.entitiesLoaded({entities})
        )
        expect(nextState.events[eventId].title).toEqual(
          entities.events[eventId].title
        )
      })
    })

    describe('entitiesDeleted', () => {
      it('should remove all payload entities', () => {
        const mockedState = {events: {[eventId]: {id: eventId}}}
        const nextState = slice.reducer(
          mockedState,
          actions.entitiesDeleted({entities: {events: [eventId]}})
        )
        expect(Object.keys(nextState.events)).toHaveLength(0)
      })

      it('should not throw if the entities type is not in the state', () => {
        const mockedState = {}
        const nextState = slice.reducer(
          mockedState,
          actions.entitiesDeleted({entities: {events: [eventId]}})
        )
        expect(nextState).toEqual(mockedState)
      })
    })

    describe('selectors', () => {
      describe('selectEventEntity', () => {
        it('should select event entity', () => {
          const state = mockState(scope, {events: {[eventId]: {id: eventId}}})
          expect(selectors.selectEventEntity(state, {id: eventId})).toEqual({
            id: eventId
          })
        })

        it('should return fallback', () => {
          const state = mockState(scope, {events: {}})
          expect(selectors.selectEventEntity(state, {id: eventId})).toEqual({})
        })
      })

      describe('makeSelectTrainingByEventId', () => {
        const selector = selectors.makeSelectTrainingByEventId()
        const id = 'training-event-id'

        it('should select event entity', () => {
          const state = mockState(scope, {
            trainingEvents: {[id]: {eventId, id}}
          })
          expect(selector(state, {id: eventId})).toEqual({eventId, id})
        })

        it('should return fallback', () => {
          const state = mockState(scope, {trainingEvents: {}})
          expect(selector(state, {id: eventId})).toEqual({})
        })
      })
    })
  })
})
