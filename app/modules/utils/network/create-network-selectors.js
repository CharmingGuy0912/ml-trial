import {createSelector} from '@reduxjs/toolkit'

import {
  createSliceFieldSelector,
  createSliceSelector
} from '@/modules/utils/common-selectors'
import NETWORK_STATUS from '@/modules/utils/network/network-status'

const createNetworkSelectors = (scope, initialState) => {
  const selectSlice = createSliceSelector(scope, initialState)

  const selectError = createSliceFieldSelector(selectSlice, 'error')
  const selectNetworkStatus = createSliceFieldSelector(
    selectSlice,
    'networkStatus'
  )
  const selectIsLoading = createSelector(
    selectNetworkStatus,
    networkStatus => networkStatus === NETWORK_STATUS.PENDING
  )

  return {
    selectError,
    selectIsLoading,
    selectNetworkStatus,
    selectSlice
  }
}

export default createNetworkSelectors
