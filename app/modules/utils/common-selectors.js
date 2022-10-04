import {createSelector} from '@reduxjs/toolkit'

const createPropSelector = (propName, fallback) => (state, props) =>
  props?.[propName] ?? fallback
const selectId = createPropSelector('id')

const createSliceSelector = (scope, initialState) => state =>
  state[scope] || initialState

const createSliceFieldSelector = (selectSlice, field, fallback) =>
  createSelector(selectSlice, slice => slice[field] ?? fallback)

const createObjectFieldByIdSelector = (selector, fallback) =>
  createSelector(selectId, selector, (id, object) => object[id] || fallback)

const createArrayContainsIdSelector = selector =>
  createSelector(selectId, selector, (id, array) => array.includes(id))

export {
  createArrayContainsIdSelector,
  createObjectFieldByIdSelector,
  createPropSelector,
  createSliceFieldSelector,
  createSliceSelector,
  selectId
}
