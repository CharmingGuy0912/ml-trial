import {compose} from 'redux'
import {injectReducer} from 'redux-injectors'

import reducer from '@/modules/entities'

const EntitiesInjector = compose(injectReducer(reducer))(() => null)

export default EntitiesInjector
