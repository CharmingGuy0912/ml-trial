import {createSlice} from '@reduxjs/toolkit'

import NETWORK_STATUS from '@/modules/utils/network/network-status'

import createResultsActions, {
  addResultsMatchers,
  initialResultsState
} from '../create-results-actions'

const scope = 'scopedSlice'
const actions = createResultsActions({scope})
const slice = createSlice({
  extraReducers: builder => {
    addResultsMatchers({builder, scope})
  },
  initialState: initialResultsState,
  name: scope
})

const id = 'id-1'

describe('module utils', () => {
  describe('results action', () => {
    describe('setQuery', () => {
      it('should set query for id', () => {
        const query = 'the search query'
        const next = slice.reducer(
          initialResultsState,
          actions.setQuery({id, query})
        )
        expect(next.queries[id]).toBe(query)
      })
    })

    describe('load', () => {
      describe('pending', () => {
        it('should delete the errors state for the given id', () => {
          const error = new Error()
          const next = slice.reducer(
            {...initialResultsState, errors: {[id]: error}},
            actions.load({id})
          )
          expect(next.errors[id]).not.toBeDefined()
        })

        it('should set the networkStatus state to pending for the given id', () => {
          const next = slice.reducer(initialResultsState, actions.load({id}))
          expect(next.networkStatus[id]).toEqual(NETWORK_STATUS.PENDING)
        })

        it('should reset results for given id on zero offset', () => {
          const next = slice.reducer(
            {...initialResultsState, results: {[id]: ['foo']}},
            actions.load({id, offset: 0})
          )
          expect(next.results[id]).toHaveLength(0)
        })

        it('should remove id from hasNextPageIds on zero offset', () => {
          const next = slice.reducer(
            {...initialResultsState, hasNextPageIds: [id]},
            actions.load({id, offset: 0})
          )
          expect(next.hasNextPageIds).toHaveLength(0)
        })
      })

      describe('fulfilled', () => {
        it('should set the networkStatus state to success for given id', () => {
          const next = slice.reducer(
            initialResultsState,
            actions.load.fulfilled({id})
          )
          expect(next.networkStatus[id]).toEqual(NETWORK_STATUS.SUCCESS)
        })

        it('should add results', () => {
          const result = ['foo']
          const next = slice.reducer(
            initialResultsState,
            actions.load.fulfilled({id, result})
          )
          expect(next.results[id]).toEqual(result)
        })

        it('should add totals', () => {
          const total = 42
          const next = slice.reducer(
            initialResultsState,
            actions.load.fulfilled({id, total})
          )
          expect(next.totals[id]).toBe(total)
        })

        it('should remove id from hasNextPageIds', () => {
          const next = slice.reducer(
            {...initialResultsState, hasNextPageIds: [id]},
            actions.load.fulfilled({hasNextPage: false, id})
          )
          expect(next.hasNextPageIds).toHaveLength(0)
        })

        it('should add id from hasNextPageIds', () => {
          const next = slice.reducer(
            initialResultsState,
            actions.load.fulfilled({hasNextPage: true, id})
          )
          expect(next.hasNextPageIds).toEqual([id])
        })
      })

      describe('rejected', () => {
        it('should set the errors state for given id', () => {
          const error = new Error('Something went wrong')
          const next = slice.reducer(
            initialResultsState,
            actions.load.rejected({error, id})
          )
          expect(next.errors[id]).toEqual(error)
        })

        it('should set the networkStatus state to failure', () => {
          const next = slice.reducer(
            initialResultsState,
            actions.load.rejected({id})
          )
          expect(next.networkStatus[id]).toEqual(NETWORK_STATUS.FAILURE)
        })
      })
    })

    describe('insert', () => {
      it('should insert the result at given index', () => {
        const result = 'new-result'
        const results = ['1', '2']

        const next = slice.reducer(
          {...initialResultsState, results: {[id]: results}},
          actions.insert({id, index: 0, result})
        )
        expect(next.results[id]).toEqual([result, ...results])
      })
    })

    describe('remove', () => {
      it('should remove the result from results state', () => {
        const result = 'new-result'
        const results = ['1', '2']

        const next = slice.reducer(
          {...initialResultsState, results: {[id]: [...results, result]}},
          actions.remove({id, result})
        )
        expect(next.results[id]).toEqual(results)
      })
    })

    describe('reset', () => {
      it('should reset the state', () => {
        const next = slice.reducer(
          {
            errors: {[id]: 'error'},
            hasNextPageIds: [id],
            networkStatus: {[id]: NETWORK_STATUS.FAILURE},
            queries: {[id]: 'query'},
            results: {[id]: ['id-1']},
            totals: {[id]: 1}
          },
          actions.reset({id})
        )
        expect(next).toEqual(initialResultsState)
      })
    })
  })
})
