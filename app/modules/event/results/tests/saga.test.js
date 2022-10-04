import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'

import {actions as entitiesActions} from '@/modules/entities'
import EVENT_TYPES from '@/modules/event/results/types'
import getEvents from '@/services/apc-api/events/get'

import saga, {
  DEFAULT_QUERY,
} from '../saga'
import {actions} from '../slice'

jest.mock('@/services/apc-api/events/get')
getEvents.mockReturnValue(Promise.resolve({}))

describe('event modules', () => {
  describe('results saga', () => {
    const id = 'test-module-id'
    const eventId = 'event-id-1'

    describe('watchLoad', () => {
      const offset = 0
      const action = actions.load({id, offset})
      const query = {
        ...DEFAULT_QUERY,
        page: {...DEFAULT_QUERY.page, offset}
      }

      it('should call the getEvents service', () =>
        expectSaga(saga.saga)
          .call(getEvents, query)
          .dispatch(action)
          .silentRun())

      it('should dispatch a fulfilled and a entitiesLoaded action on success', () => {
        const response = {
          entities: {
            events: {
              [eventId]: {id: eventId, type: EVENT_TYPES.OTHER}
            }
          },
          meta: {limit: 40, rowCount: 1},
          result: {
            events: [eventId]
          }
        }

        return expectSaga(saga.saga)
          .provide([[call.fn(getEvents), response]])
          .put(
            actions.load.fulfilled({
              hasNextPage: false,
              id,
              result: response.result.events,
              total: response.result.events.length
            })
          )
          .put(entitiesActions.entitiesLoaded({entities: response.entities}))
          .dispatch(action)
          .silentRun()
      })

      it('should not throw if there are no results', () => {
        const errorAction = actions.load({id})
        return expectSaga(saga.saga)
          .provide([[call.fn(getEvents), {result: {}}]])
          .not.put.actionType(actions.load.rejected.type)
          .dispatch(errorAction)
          .silentRun()
      })

      it('should dispatch a rejected action on failure', () => {
        const error = new Error('Something went wrong')
        return expectSaga(saga.saga)
          .provide([
            [call.fn(getEvents), throwError(error)],
          ])
          .put(actions.load.rejected({error, id}))
          .dispatch(action)
          .silentRun()
      })
    })
  })
})
