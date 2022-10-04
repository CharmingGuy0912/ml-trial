import {createAction} from '@reduxjs/toolkit'

import NETWORK_STATUS from '@/modules/utils/network/network-status'

const createNetworkAction = ({scope, type}) => {
  const typePrefix = `${scope}/${type}`
  const action = createAction(`${typePrefix}/${NETWORK_STATUS.PENDING}`)
  action.fulfilled = createAction(`${typePrefix}/${NETWORK_STATUS.SUCCESS}`)
  action.rejected = createAction(`${typePrefix}/${NETWORK_STATUS.FAILURE}`)
  return action
}

const isNetworkAction = (scope, networkStatus) => action =>
  action.type.startsWith(`${scope}/`) &&
  action.type.endsWith(`/${networkStatus}`)

const addNetworkMatchers = (scope, builder) => {
  builder
    .addMatcher(isNetworkAction(scope, NETWORK_STATUS.PENDING), state => {
      state.error = null
      state.networkStatus = NETWORK_STATUS.PENDING
    })
    .addMatcher(isNetworkAction(scope, NETWORK_STATUS.SUCCESS), state => {
      state.networkStatus = NETWORK_STATUS.SUCCESS
    })
    .addMatcher(
      isNetworkAction(scope, NETWORK_STATUS.FAILURE),
      (state, action) => {
        state.error = action.payload?.error
        state.networkStatus = NETWORK_STATUS.FAILURE
      }
    )
}

export {addNetworkMatchers, isNetworkAction}
export default createNetworkAction
