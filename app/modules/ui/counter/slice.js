import {createAction, createSelector, createSlice} from '@reduxjs/toolkit'
import deepFreeze from 'deep-freeze'

const scope = 'uiCounter'
const initialState = deepFreeze({
  count: 0
})

const selectSlice = state => state[scope] ?? {}
const selectCount = createSelector(selectSlice, slice => slice.count)

const slice = createSlice({
  initialState,
  name: scope,
  reducers: {
    increment: state => {
      state.count += 1
    },
    setCount: (state, action) => {
      state.count = action.payload.count
    }
  }
})

const actions = {
  increment: slice.actions.increment,
  reset: createAction(`${slice.name}/reset`),
  setCount: slice.actions.setCount
}

const selectors = {
  selectCount
}

export {actions, scope, selectors}

export default {
  key: slice.name,
  reducer: slice.reducer
}
