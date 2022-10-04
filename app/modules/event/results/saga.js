import merge from 'lodash/merge'
import {call, put} from 'redux-saga/effects'

import {actions as entitiesActions} from '@/modules/entities'
import getEvents from '@/services/apc-api/events/get'
import extractMeta from '@/utils/extract-meta'
import {takeLatestById} from '@/utils/saga-utils'

import {actions, scope} from './slice'

const DEFAULT_QUERY = {
  page: {limit: 1000}
}

function createQuery({offset = 0, filter}) {
  return merge(
    {},
    DEFAULT_QUERY,
    {
      // eslint-disable-next-line sort-keys
      filter, 
      page: {...DEFAULT_QUERY.page, offset}
    },
  )
}

function* watchLoad({payload: {id, offset, filter}}) {
  try {
    // eslint-disable-next-line sort-keys
    const query = yield call(createQuery, {id, offset, filter})
    const response = yield call(getEvents, query)

    const {
      entities,
      meta,
      result: {events = []}
    } = response
    const {hasNextPage, total} = extractMeta(meta)

    yield put(
      actions.load.fulfilled({
        hasNextPage,
        id,
        result: events,
        total
      })
    )
    yield put(entitiesActions.entitiesLoaded({entities}))
  } catch (error) {
    yield put(actions.load.rejected({error, id}))
  }
}

function* saga() {
  yield takeLatestById(actions.load, watchLoad)
}

export {DEFAULT_QUERY}

export default {
  key: `${scope}Saga`,
  saga
}
