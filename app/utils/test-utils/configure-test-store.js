import store, {actionEmitter, history} from '../../configure-store'

const configureTestStore = (config = {}) => {
  jest.spyOn(store, 'dispatch')

  const clearDispatch = () => store.dispatch.mockClear()

  return {
    clearDispatch,
    history,
    options: {
      wrapperProps: {
        store,
        ...(config.withActionSubscription && {actionEmitter})
      }
    },
    store
  }
}

export default configureTestStore
