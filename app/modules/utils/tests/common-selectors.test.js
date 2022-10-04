import {
  createPropSelector,
  createSliceFieldSelector,
  createSliceSelector,
  selectId
} from '@/modules/utils/common-selectors'
import NETWORK_STATUS from '@/modules/utils/network/network-status'
import mockState from '@/utils/test-utils/mock-state'

describe('module utils', () => {
  describe('common selectors', () => {
    describe('createPropSelector', () => {
      it('should return a prop selector function', () => {
        const selectProp = createPropSelector('propName')
        expect(selectProp(null, {propName: 'value'})).toEqual('value')
      })

      it('should return a fallback if the prop is not available', () => {
        const selectProp = createPropSelector('propName', 'fallback')
        expect(selectProp()).toEqual('fallback')
      })
    })

    describe('selectId', () => {
      it('should select the id prop', () => {
        const props = {id: 'entity-id-1'}
        expect(selectId(null, props)).toEqual(props.id)
      })
    })

    describe('createSliceSelector', () => {
      const scope = 'scopedSlice'
      const data = {networkStatus: NETWORK_STATUS.PENDING}
      const fallback = 'fallback'
      const sliceSelector = createSliceSelector(scope, fallback)

      it('should return a slice selector function', () => {
        const state = {[scope]: data}
        expect(sliceSelector(state)).toEqual(data)
      })

      it('should return a fallback if the slice is not available', () => {
        expect(sliceSelector({})).toEqual(fallback)
      })
    })

    describe('createSliceFieldSelector', () => {
      const scope = 'scopedSlice'
      const data = {networkStatus: NETWORK_STATUS.PENDING}
      const sliceSelector = createSliceSelector(scope)
      const fallback = 'fallback'
      const selectField = createSliceFieldSelector(
        sliceSelector,
        'networkStatus',
        fallback
      )

      it('should return a slice field selector function', () => {
        expect(selectField(mockState(scope, data))).toEqual(
          NETWORK_STATUS.PENDING
        )
      })

      it('should return a fallback if the slice field is not available', () => {
        expect(selectField(mockState(scope, {}))).toEqual(fallback)
      })
    })
  })
})
