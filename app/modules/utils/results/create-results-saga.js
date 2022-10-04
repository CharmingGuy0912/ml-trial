import merge from 'lodash/merge'
import omit from 'lodash/omit'
import {call, put, select} from 'redux-saga/effects'

import {actions as entitiesActions} from '@/modules/entities'
import extractMeta from '@/utils/extract-meta'
import {takeLatestById} from '@/utils/saga-utils'

const createResultsSaga = ({
  entitiesName,
  loadAction,
  queryParams = {},
  searchFields = ['title'],
  searchQuerySelector,
  request,
  setQueryAction
}) => {
  const defaultQuery = {
    page: {limit: 40, offset: 0}
  }

  function* createFilter(id) {
    const query = yield select(searchQuerySelector, {id})

    if (query.length) {
      return {
        or: searchFields.map(field => ({like: {[field]: query}}))
      }
    }

    return null
  }

  function* createQuery(id, offset = 0) {
    const filter = yield call(createFilter, id)
    return merge({}, defaultQuery, queryParams, {page: {offset}}, {filter})
  }

  function* watchLoad({payload: {id, offset = 0, ...payload}}) {
    try {
      const query = yield call(createQuery, id, offset)
      const response = yield call(request, query, payload)
      const {entities, result, meta} = response
      const {hasNextPage, total} = extractMeta(meta)

      yield put(entitiesActions.entitiesLoaded({entities}))
      yield put(
        loadAction.fulfilled({
          hasNextPage,
          id,
          result: result[entitiesName],
          total
        })
      )
    } catch (error) {
      yield put(loadAction.rejected({error, id}))
    }
  }

  function* watchSetQuery({payload}) {
    yield put(loadAction({...omit(payload, ['query']), offset: 0}))
  }

  function* saga() {
    yield takeLatestById(loadAction.type, watchLoad)
    yield takeLatestById(setQueryAction.type, watchSetQuery)
  }

  return {
    defaultQuery,
    saga,
    watchLoad,
    watchSetQuery
  }
}

export default createResultsSaga
