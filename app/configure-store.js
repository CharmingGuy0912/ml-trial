import {
  combineReducers,
  configureStore as configureToolkitStore,
  isPlain
} from '@reduxjs/toolkit'
import {createBrowserHistory} from '@tanstack/react-location'
import {createReduxHistoryContext} from 'redux-first-history'
import {createInjectorsEnhancer} from 'redux-injectors'
import createSagaMiddleware from 'redux-saga'

import ActionSubscription, {
  actionListenerMiddleware
} from '@/components/organisms/ActionSubscription'

const actionEmitter = new ActionSubscription.ActionEmitter()

const {createReduxHistory, routerMiddleware, routerReducer} =
  createReduxHistoryContext({
    history: createBrowserHistory()
  })

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const {run: runSaga} = sagaMiddleware
  const middlewares = [
    sagaMiddleware,
    routerMiddleware,
    actionListenerMiddleware(actionEmitter)
  ]

  const createReducer = injectedReducers =>
    combineReducers({
      router: routerReducer,
      ...injectedReducers
    })
  const enhancers = [createInjectorsEnhancer({createReducer, runSaga})]

  const isSerializable = value =>
    value instanceof Error ||
    value instanceof File ||
    value instanceof Response ||
    isPlain(value)

  const store = configureToolkitStore({
    // eslint-disable-next-line no-undef
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
    middleware: getDefaultMiddleware => [
      ...getDefaultMiddleware({serializableCheck: {isSerializable}}),
      ...middlewares
    ],
    reducer: createReducer()
  })

  store.injectedReducers = {}
  store.injectedSagas = {}

  return store
}

const store = configureStore()
const history = createReduxHistory(store)

export {configureStore, history, actionEmitter}

export default store
