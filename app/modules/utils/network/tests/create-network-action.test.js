import {createSlice} from '@reduxjs/toolkit'

import NETWORK_STATUS from '@/modules/utils/network/network-status'

import createNetworkAction, {addNetworkMatchers} from '../create-network-action'

const scope = 'scopedSlice'
const action = createNetworkAction({scope, type: 'action'})
const slice = createSlice({
  extraReducers: builder => {
    addNetworkMatchers(scope, builder)
  },
  initialState: {},
  name: scope
})

describe('module utils', () => {
  describe('network action', () => {
    describe('pending', () => {
      it('should set the error state to null', () => {
        const error = new Error()
        const next = slice.reducer({error}, action())
        expect(next.error).toBeNull()
      })

      it('should set the networkStatus state to pending', () => {
        const next = slice.reducer({}, action())
        expect(next.networkStatus).toEqual(NETWORK_STATUS.PENDING)
      })
    })

    describe('fulfilled', () => {
      it('should set the networkStatus state to success', () => {
        const next = slice.reducer({}, action.fulfilled())
        expect(next.networkStatus).toEqual(NETWORK_STATUS.SUCCESS)
      })
    })

    describe('rejected', () => {
      it('should set the error state', () => {
        const error = new Error('Something went wrong')
        const next = slice.reducer({}, action.rejected({error}))
        expect(next.error).toEqual(error)
      })

      it('should set the networkStatus state to failure', () => {
        const next = slice.reducer({}, action.rejected())
        expect(next.networkStatus).toEqual(NETWORK_STATUS.FAILURE)
      })
    })
  })
})
