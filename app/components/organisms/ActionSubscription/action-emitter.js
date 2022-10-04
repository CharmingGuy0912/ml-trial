class ActionEmitter {
  constructor() {
    this.subscriber = null
  }

  setSubscriber = subscriber => {
    this.subscriber = subscriber
  }

  unsubscribe = () => {
    this.subscriber = null
  }

  emit = (actionType, actionPayload) => {
    /* istanbul ignore else */
    if (this.subscriber) {
      this.subscriber(actionType, actionPayload)
    }
  }
}

export default ActionEmitter
