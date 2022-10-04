import {expectSaga} from 'redux-saga-test-plan'

import saga from '../saga'
import {actions} from '../slice'

describe('ui modules', () => {
  describe('counter saga', () => {
    it('should put a setCount action with 0 if a reset action has been dispatched', () =>
      expectSaga(saga.saga)
        .put(actions.setCount({count: 0}))
        .dispatch(actions.reset())
        .silentRun())
  })
})
