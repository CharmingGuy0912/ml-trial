import NETWORK_STATUS from '@/modules/utils/network/network-status'
import {initialResultsState} from '@/modules/utils/results/create-results-actions'

import slice, {actions} from '../slice'

const eventId = 'event-id-1'
const id = 'module-id'

describe('events modules', () => {
  describe('results slice', () => {
    describe('load.fulfilled', () => {
      it('should set the result state', () => {
        const next = slice.reducer(
          initialResultsState,
          actions.load.fulfilled({id, result: [eventId]})
        )
        expect(next.results[id]).toEqual([eventId])
      })

      it('should set the total state to 1', () => {
        const next = slice.reducer(
          initialResultsState,
          actions.load.fulfilled({id, total: 1})
        )
        expect(next.totals[id]).toEqual(1)
      })

      it('should set the network state', () => {
        const next = slice.reducer(
          initialResultsState,
          actions.load.fulfilled({id})
        )
        expect(next.networkStatus[id]).toEqual(NETWORK_STATUS.SUCCESS)
      })
    })

    describe('load.rejected', () => {
      it('should set the networkStatus state to failure', () => {
        const next = slice.reducer(
          initialResultsState,
          actions.load.rejected({id})
        )
        expect(next.networkStatus[id]).toEqual(NETWORK_STATUS.FAILURE)
      })

      it('should set the error state', () => {
        const error = 'error'
        const next = slice.reducer(
          initialResultsState,
          actions.load.rejected({error, id})
        )
        expect(next.errors[id]).toEqual(error)
      })
    })
  })
})
