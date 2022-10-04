import {createAction} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

import createNetworkAction, {
  isNetworkAction
} from '@/modules/utils/network/create-network-action'
import NETWORK_STATUS from '@/modules/utils/network/network-status'

const initialResultsState = deepFreeze({
  errors: {},
  hasNextPageIds: [],
  networkStatus: {},
  queries: {},
  results: {},
  totals: {}
})

/* eslint-disable indent */
const createResetById =
  (arrayFields = [], objectFields = []) =>
  (state, action) => {
    const {id} = action.payload

    arrayFields.forEach(field => {
      if (state[field].includes(id)) {
        state[field].splice(state[field].indexOf(id), 1)
      }
    })

    objectFields.forEach(field => {
      delete state[field][id]
    })
  }
/* eslint-enable indent */

const createResultsActions = ({scope}) => {
  const load = createNetworkAction({scope, type: 'load'})
  const setQuery = createAction(`${scope}/setQuery`)
  const insert = createAction(`${scope}/insert`)
  const remove = createAction(`${scope}/remove`)
  const reset = createAction(`${scope}/reset`)

  return {
    insert,
    load,
    remove,
    reset,
    setQuery
  }
}

const addResultsMatchers = ({
  arrayFields = [],
  builder,
  scope,
  objectFields = []
}) => {
  builder
    .addCase(`${scope}/setQuery`, (state, action) => {
      const {id, query} = action.payload
      state.queries[id] = query.trim()
    })
    .addCase(`${scope}/remove`, (state, action) => {
      const {id, result} = action.payload
      state.results[id].splice(state.results[id].indexOf(result), 1)
      state.totals[id] -= 1
    })
    .addCase(`${scope}/insert`, (state, action) => {
      const {id, index, result} = action.payload
      state.results[id].splice(index, 0, result)
      state.totals[id] += 1
    })
    .addCase(
      `${scope}/reset`,
      createResetById(
        ['hasNextPageIds', ...arrayFields],
        [
          'errors',
          'networkStatus',
          'queries',
          'results',
          'totals',
          ...objectFields
        ]
      )
    )
    .addMatcher(
      isNetworkAction(scope, NETWORK_STATUS.PENDING),
      (state, action) => {
        const {id, offset} = action.payload

        delete state.errors[id]

        state.networkStatus[id] = NETWORK_STATUS.PENDING

        if (offset === 0) {
          state.results[id] = []

          if (state.hasNextPageIds.includes(id)) {
            state.hasNextPageIds.splice(state.hasNextPageIds.indexOf(id), 1)
          }
        }
      }
    )
    .addMatcher(
      isNetworkAction(scope, NETWORK_STATUS.SUCCESS),
      (state, action) => {
        const {hasNextPage, id, result = [], total} = action.payload

        state.networkStatus[id] = NETWORK_STATUS.SUCCESS
        state.results[id] ||= []
        state.results[id].push(...result)
        state.totals[id] = total

        if (!hasNextPage && state.hasNextPageIds.includes(id)) {
          state.hasNextPageIds.splice(state.hasNextPageIds.indexOf(id), 1)
        }

        if (hasNextPage && !state.hasNextPageIds.includes(id)) {
          state.hasNextPageIds.push(id)
        }
      }
    )
    .addMatcher(
      isNetworkAction(scope, NETWORK_STATUS.FAILURE),
      (state, action) => {
        const {error, id} = action.payload

        state.errors[id] = error
        state.networkStatus[id] = NETWORK_STATUS.FAILURE
      }
    )
}

export {addResultsMatchers, initialResultsState}
export default createResultsActions
