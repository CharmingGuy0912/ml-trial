import {cancel, fork, take} from 'redux-saga/effects'

const takeLatestById = (patternOrChannel, saga, ...args) =>
  fork(function* takeLatestByIdFork() {
    const lastTasks = {}

    while (true) {
      const action = yield take(patternOrChannel)
      const {id} = action.payload

      if (lastTasks[id]) {
        yield cancel(lastTasks[id])
      }

      lastTasks[id] = yield fork(saga, ...args.concat(action))
    }
  })

// eslint-disable-next-line import/prefer-default-export
export {takeLatestById}
