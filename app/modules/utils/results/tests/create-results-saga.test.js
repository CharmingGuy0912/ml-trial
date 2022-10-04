import {createAction} from '@reduxjs/toolkit'
import {expectSaga} from 'redux-saga-test-plan'
import {call} from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {select} from 'redux-saga/effects'

import {actions as entitiesActions} from '@/modules/entities'

import createNetworkAction from '../../network/create-network-action'
import createResultsSaga from '../create-results-saga'

const id = 'the-id'

const searchQuerySelector = jest.fn()
const request = jest.fn()
const loadAction = createNetworkAction({scope: 'test', type: 'load'})
const setQueryAction = createAction('setQuery')
const entitiesName = 'exercises'

const saga = createResultsSaga({
  entitiesName,
  loadAction,
  request,
  searchQuerySelector,
  setQueryAction
})

describe('module utils', () => {
  describe('results saga', () => {
    describe('watchLoad', () => {
      const action = loadAction({id})

      it('should create query params and call request', () => {
        const query = 'the search query'

        return expectSaga(saga.saga)
          .provide([[select(searchQuerySelector, {id}), query]])
          .call(
            request,
            {...saga.defaultQuery, filter: {or: [{like: {title: query}}]}},
            {}
          )
          .dispatch(action)
          .silentRun()
      })

      it('should dispatch fulfilled and entitiesLoaded actions', () => {
        const response = {
          entities: {
            [entitiesName]: {
              1: {
                createdBy: 1,
                id: '1',
                updatedBy: 1
              }
            }
          },
          meta: {
            limit: 40,
            offset: 0,
            pageCount: 1,
            rowCount: 1
          },
          result: {
            [entitiesName]: ['1']
          }
        }

        return expectSaga(saga.saga)
          .provide([
            [select(searchQuerySelector, {id}), ''],
            [call.fn(request), response]
          ])
          .put(entitiesActions.entitiesLoaded({entities: response.entities}))
          .put(
            loadAction.fulfilled({
              hasNextPage: false,
              id,
              result: response.result[entitiesName],
              total: 1
            })
          )
          .dispatch(action)
          .silentRun()
      })

      it('should dispatch a rejected action', () => {
        const error = new Error('Something went wrong')

        return expectSaga(saga.saga)
          .provide([
            [select(searchQuerySelector, {id}), ''],
            [call.fn(request), throwError(error)]
          ])
          .put(loadAction.rejected({error, id}))
          .dispatch(action)
          .silentRun()
      })
    })

    describe('watchSetQuery', () => {
      const action = setQueryAction({id, query: 'the search query'})

      it('should dispatch a load action', () =>
        expectSaga(saga.saga)
          .put(loadAction({id, offset: 0}))
          .dispatch(action)
          .silentRun())
    })
  })
})
