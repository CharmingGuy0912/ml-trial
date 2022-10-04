import '@testing-library/jest-dom'
import 'whatwg-fetch'

import './mocks/resize-observer-mock'

jest.mock('lodash/debounce')
jest.mock('lodash/throttle')
jest.mock('tabbable')
jest.mock('@/utils/request')

const observe = jest.fn()
const unobserve = jest.fn()
const disconnect = jest.fn()
window.IntersectionObserver = jest.fn(() => ({
  disconnect,
  observe,
  unobserve
}))
