import {expectSaga} from 'redux-saga-test-plan'
import {delay, put} from 'redux-saga/effects'

import {takeLatestById} from '../saga-utils'

const LOAD_ACTION = 'LOAD_ACTION'
const LOADED_ACTION = 'LOADED_ACTION'
const loadAction = payload => ({payload, type: LOAD_ACTION})
const loadedAction = payload => ({payload, type: LOADED_ACTION})

describe('saga-utils', () => {
  describe('takeLatestById', () => {
    function* watchFunction({payload: {id, value}}) {
      // Delay to give a chance to cancel saga
      yield delay(1)
      yield put(loadedAction({id, value}))
    }
    function* testSaga() {
      yield takeLatestById(LOAD_ACTION, watchFunction)
    }
    const id = 'some-id'

    it('should call the provided watchFunction', () => {
      const value = 'foo'

      return expectSaga(testSaga)
        .put(loadedAction({id, value}))
        .dispatch(loadAction({id, value}))
        .silentRun()
    })
    it('should cancel the provided watchFunction on multiple actions', () => {
      const firstValue = 'foo'
      const secondValue = 'bar'

      return expectSaga(testSaga)
        .not.put(loadedAction({id, value: firstValue}))
        .put(loadedAction({id, value: secondValue}))
        .dispatch(loadAction({id, value: firstValue}))
        .dispatch(loadAction({id, value: secondValue}))
        .silentRun()
    })
  })
})
