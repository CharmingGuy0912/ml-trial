import NETWORK_STATUS from '@/modules/utils/network/network-status'
import mockState from '@/utils/test-utils/mock-state'

import {initialResultsState} from '../create-results-actions'
import createResultsSelectors from '../create-results-selectors'

const id = 'id-1'

const scope = 'scopedSlice'
const selectors = createResultsSelectors({
  initialState: initialResultsState,
  scope
})

describe('module utils', () => {
  describe('results selectors', () => {
    describe('makeSelectError', () => {
      const selector = selectors.makeSelectError()

      it('should select the error state', () => {
        const error = new Error('Something went wrong')
        const state = mockState(scope, {errors: {[id]: error}})
        expect(selector(state, {id})).toEqual(error)
      })
    })

    describe('makeSelectHasNextPage', () => {
      const selector = selectors.makeSelectHasNextPage()

      it('should return true', () => {
        const state = mockState(scope, {hasNextPageIds: [id]})
        expect(selector(state, {id})).toBe(true)
      })

      it('should return false', () => {
        const state = mockState(scope, {hasNextPageIds: []})
        expect(selector(state, {id})).toBe(false)
      })
    })

    describe('makeSelectIsLoading', () => {
      const selector = selectors.makeSelectIsLoading()

      it('should select loading state for id', () => {
        const state = mockState(scope, {
          networkStatus: {[id]: NETWORK_STATUS.PENDING}
        })
        expect(selector(state, {id})).toBe(true)
      })

      it('should select loading state for id', () => {
        const state = mockState(scope, {
          networkStatus: {[id]: NETWORK_STATUS.IDLE}
        })
        expect(selector(state, {id})).toBe(false)
      })
    })

    describe('makeSelectIsLoaded', () => {
      const selector = selectors.makeSelectIsLoaded()

      it('should return false if networkStatus is not success', () => {
        const state = mockState(scope, {
          networkStatus: {[id]: NETWORK_STATUS.PENDING}
        })
        expect(selector(state, {id})).toBeFalsy()
      })

      it('should return false if networkStatus is success', () => {
        const state = mockState(scope, {
          networkStatus: {[id]: NETWORK_STATUS.SUCCESS}
        })
        expect(selector(state, {id})).toBeTruthy()
      })
    })

    describe('makeSelectQuery', () => {
      const selector = selectors.makeSelectQuery()

      it('should select query state for id', () => {
        const query = 'the query'
        const state = mockState(scope, {
          queries: {[id]: query}
        })
        expect(selector(state, {id})).toBe(query)
      })
    })

    describe('makeSelectResult', () => {
      const selector = selectors.makeSelectResult()

      it('should select result state for id', () => {
        const result = ['foo', 'bar', 'baz']
        const state = mockState(scope, {
          results: {[id]: result}
        })
        expect(selector(state, {id})).toBe(result)
      })
    })

    describe('makeSelectTotal', () => {
      const selector = selectors.makeSelectTotal()

      it('should select total state for id', () => {
        const total = 42
        const state = mockState(scope, {
          totals: {[id]: total}
        })
        expect(selector(state, {id})).toBe(total)
      })
    })
  })
})
