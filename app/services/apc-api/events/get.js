import {getRandomEventsForQuery} from './data'

const TIMEOUT = 300

const getEvents = (query = {}) =>
  new Promise(resolve => {
    window.setTimeout(() => {
      resolve(getRandomEventsForQuery(query))
    }, TIMEOUT)
  })

export default getEvents
