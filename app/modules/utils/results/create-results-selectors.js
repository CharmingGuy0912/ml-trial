import {createSelector} from '@reduxjs/toolkit'

import {
  createArrayContainsIdSelector,
  createObjectFieldByIdSelector,
  createSliceFieldSelector,
  createSliceSelector
} from '@/modules/utils/common-selectors'
import NETWORK_STATUS from '@/modules/utils/network/network-status'

const createResultsSelectors = ({initialState, scope}) => {
  const selectSlice = createSliceSelector(scope, initialState)

  let selectors = {
    selectErrors: createSliceFieldSelector(selectSlice, 'errors'),
    selectHasNextPageIds: createSliceFieldSelector(
      selectSlice,
      'hasNextPageIds'
    ),
    selectNetworkStatus: createSliceFieldSelector(selectSlice, 'networkStatus'),
    selectQueries: createSliceFieldSelector(selectSlice, 'queries'),
    selectResults: createSliceFieldSelector(selectSlice, 'results'),
    selectTotals: createSliceFieldSelector(selectSlice, 'totals')
  }

  const RESULT_FALLBACK = []
  selectors = {
    ...selectors,
    selectError: createObjectFieldByIdSelector(selectors.selectErrors, null),
    selectHasNextPage: createArrayContainsIdSelector(
      selectors.selectHasNextPageIds,
      true
    ),
    selectIsLoaded: createSelector(
      createObjectFieldByIdSelector(selectors.selectNetworkStatus, null),
      networkStatus => networkStatus === NETWORK_STATUS.SUCCESS
    ),
    selectIsLoading: createSelector(
      createObjectFieldByIdSelector(selectors.selectNetworkStatus, null),
      networkStatus => networkStatus === NETWORK_STATUS.PENDING
    ),
    selectQuery: createObjectFieldByIdSelector(selectors.selectQueries, ''),
    selectResult: createObjectFieldByIdSelector(
      selectors.selectResults,
      RESULT_FALLBACK
    ),
    selectTotal: createObjectFieldByIdSelector(selectors.selectTotals)
  }

  selectors = {
    ...selectors,
    makeSelectError: () => selectors.selectError,
    makeSelectHasNextPage: () => selectors.selectHasNextPage,
    makeSelectIsLoaded: () => selectors.selectIsLoaded,
    makeSelectIsLoading: () => selectors.selectIsLoading,
    makeSelectQuery: () => selectors.selectQuery,
    makeSelectResult: () => selectors.selectResult,
    makeSelectTotal: () => selectors.selectTotal
  }

  return selectors
}

export default createResultsSelectors
