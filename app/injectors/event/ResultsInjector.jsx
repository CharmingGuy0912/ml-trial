import {compose} from 'redux'
import {injectReducer, injectSaga} from 'redux-injectors'

import reducer, {saga} from '@/modules/event/results'

const EventResultsInjector = compose(
  injectReducer(reducer),
  injectSaga(saga)
)(() => null)

export default EventResultsInjector
