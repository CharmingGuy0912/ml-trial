// istanbul ignore file
import {faker} from '@faker-js/faker'
import {add, eachDayOfInterval, endOfToday, set, startOfToday} from 'date-fns'
import capitalize from 'lodash/capitalize'

import EVENT_TYPES, {AVAILABLE_EVENT_TYPES} from '@/modules/event/results/types'
import {AVAILABLE_FILE_TYPES} from '@/modules/file/types'
import mapToResult from '@/utils/test-utils/map-to-result'
import reduceToEntities from '@/utils/test-utils/reduce-to-entities'

const OTHER_TITLES = ['COVID-Testung', 'ITP']
const TITLE_CONFIG = {max: 5, min: 2}

const createEventTitle = type => {
  switch (type) {
    case EVENT_TYPES.AWAY_GAME:
      return capitalize(
        faker.lorem.words(
          Math.round(Math.random() * (TITLE_CONFIG.max - TITLE_CONFIG.min)) +
            TITLE_CONFIG.min
        )
      )

    case EVENT_TYPES.OTHER:
      return OTHER_TITLES[Math.floor(Math.random() * OTHER_TITLES.length)]

    default:
      return null
  }
}

const HAS_DESCRIPTION = 2
const DESCRIPTION_CONFIG = {max: 15, min: 3}
const createEventDescription = () => {
  if (Math.random() > HAS_DESCRIPTION) {
    return null
  }
  return `Optional: ${faker.lorem.words(
    Math.round(
      Math.random() * (DESCRIPTION_CONFIG.max - DESCRIPTION_CONFIG.min)
    ) + DESCRIPTION_CONFIG.min
  )}`
}

const LOCATIONS = 5
const createEventLocation = () => `P${Math.ceil(Math.random() * LOCATIONS)}`

const createFile = () => ({type: faker.helpers.arrayElement(AVAILABLE_FILE_TYPES)})
const createFiles = () => Array.from({length: faker.datatype.number({max: 5, min: 0})}, createFile)

const createExercise = () => ({
  description: faker.lorem.sentence(),
  duration: faker.datatype.number({max: 60, min: 1}),
  files: createFiles(),
  guestParticipantsCount: faker.datatype.number({max: 20, min: 0}),
  participantsCount: faker.datatype.number({max: 20, min: 1}),
  title: faker.random.words(),
})
const createEventExercises = type => {
  if(type === EVENT_TYPES.TRAINING) {
    return Array.from({length: faker.datatype.number({max: 5, min: 0})}, createExercise)
  }
  return null
}

const HAS_EVENTS = 0.75
const MAX_EVENTS = 10
const getRandomEvents = ({
  date,
  eventTypes = AVAILABLE_EVENT_TYPES,
  maxEvents = MAX_EVENTS
}) => {
  if (Math.random() > HAS_EVENTS) {
    return []
  }

  const startDate = set(date, {
    hours: 6,
    minutes: 0,
    seconds: 0
  })
  const endDate = add(startDate, {hours: 12})

  return faker.date
    .betweens(startDate, endDate, Math.random() * maxEvents)
    .map(eventDate => {
      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
      const description = createEventDescription()
      const location = createEventLocation()
      const files = createFiles()
      const exercises = createEventExercises(type)

      return {
        endDate: faker.date.between(eventDate, add(eventDate, {hours: 4})).toISOString(),
        guestParticipantsCount: faker.datatype.number({max: 20, min: 0}),
        id: faker.datatype.uuid(),
        participantsCount: faker.datatype.number({max: 20, min: 1}),
        startDate: eventDate.toISOString(),
        title: createEventTitle(type),
        type,
        ...(description && {description}),
        ...(location && {location}),
        ...(files && {files}),
        ...(exercises && {exercises}),
      }
    })
}

const getRandomEventsForQuery = ({filter: {startDate = startOfToday(), endDate = endOfToday()} = {}}) => {
  const events = eachDayOfInterval({end: endDate, start: startDate})
    .reduce((acc, date) => ([...acc, ...getRandomEvents({date})]), [])

  return {
    entities: {
      events: reduceToEntities(events)
    },
    result: {
      events: mapToResult(events)
    },
    meta: {
      rowCount: events.length
    }
  }
}


export {
  getRandomEvents,
  getRandomEventsForQuery,
}
