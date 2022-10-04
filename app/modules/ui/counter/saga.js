import {put, takeEvery} from 'redux-saga/effects'

import {actions, scope} from './slice'

function* watchReset() {
  yield put(actions.setCount({count: 0}))
}

function* saga() {
  yield takeEvery(actions.reset.type, watchReset)
}

export default {
  key: `${scope}Saga`,
  saga
}
