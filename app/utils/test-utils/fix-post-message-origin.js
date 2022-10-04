const fixPostMessageOrigin = (window, origin) => {
  /*
   * Workaround for https://github.com/jsdom/jsdom/issues/2745
   * if no origin exists, replace with provided origin
   */
  window.addEventListener('message', event => {
    if (event.origin === '') {
      event.stopImmediatePropagation()
      const eventWithOrigin = new MessageEvent('message', {
        data: event.data,
        origin
      })
      window.dispatchEvent(eventWithOrigin)
    }
  })
}

export default fixPostMessageOrigin
