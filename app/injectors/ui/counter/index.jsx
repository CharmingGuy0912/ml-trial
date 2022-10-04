import {compose} from 'redux'
import {injectReducer, injectSaga} from 'redux-injectors'

import reducer, {saga} from '@/modules/ui/counter'

const CounterInjector = () => null

export default compose(
  injectReducer(reducer),
  injectSaga(saga)
)(CounterInjector)
