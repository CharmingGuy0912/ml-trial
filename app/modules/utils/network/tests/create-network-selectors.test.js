import createNetworkSelectors from '@/modules/utils/network/create-network-selectors'
import NETWORK_STATUS from '@/modules/utils/network/network-status'
import mockState from '@/utils/test-utils/mock-state'

describe('module utils', () => {
  describe('network selectors', () => {
    const scope = 'scopedSlice'
    const selectors = createNetworkSelectors(scope)

    describe('selectError', () => {
      it('should select the error state', () => {
        const error = new Error('Something went wrong')
        const state = mockState(scope, {error})
        expect(selectors.selectError(state)).toEqual(error)
      })
    })

    describe('selectNetworkStatus', () => {
      it('should select the networkStatus state', () => {
        const networkStatus = NETWORK_STATUS.PENDING
        const state = mockState(scope, {networkStatus})
        expect(selectors.selectNetworkStatus(state)).toEqual(networkStatus)
      })
    })
  })
})
