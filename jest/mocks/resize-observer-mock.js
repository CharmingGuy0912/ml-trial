class MockResizeObserver {
  static constructorFn = jest.fn()

  static observe = jest.fn()

  static unobserve = jest.fn()

  static disconnect = jest.fn()

  static triggerCallbackMap = new Map()

  static trigger = (element, entries) => {
    this.triggerCallbackMap.get(element)?.(entries)
  }

  static mockClear() {
    this.constructorFn.mockClear()
    this.observe.mockClear()
    this.unobserve.mockClear()
    this.disconnect.mockClear()
  }

  constructor(...args) {
    this.constructor.constructorFn(...args)

    const [callback] = args
    this.callback = callback
  }

  observe(...args) {
    this.constructor.observe(...args)

    const [element] = args
    this.constructor.triggerCallbackMap.set(element, this.callback)
  }

  unobserve = this.constructor.unobserve

  disconnect = this.constructor.disconnect
}

window.ResizeObserver = MockResizeObserver
