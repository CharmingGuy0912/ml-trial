const actionListenerMiddleware = actionEmitter => () => next => action => {
  if (actionEmitter) {
    actionEmitter.emit(action.type, action.payload)
  }
  return next(action)
}

export default actionListenerMiddleware
