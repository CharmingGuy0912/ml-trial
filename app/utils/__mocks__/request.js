import noop from 'lodash/noop'

const request = jest.fn(() => new Promise(noop))
const requestText = jest.fn(() => new Promise(noop))

export {requestText}
export default request
