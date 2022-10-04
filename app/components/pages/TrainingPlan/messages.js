import {defineMessages} from 'react-intl'

const scope = 'pages.trainings-plan'

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Trainingsplan',
    description: 'title of the page'
  },
  training: {
    id: `${scope}.training`,
    defaultMessage: 'Training'
  },
  homeGame: {
    id: `${scope}.homeGame`,
    defaultMessage: 'Heimspiel'
  },
  roadGame: {
    id: `${scope}.roadGame`,
    defaultMessage: 'Auswärtsspiel'
  },
  other: {
    id: `${scope}.other`,
    defaultMessage: 'Sonstiges'
  },
  tournament: {
    id: `${scope}.tournament`,
    defaultMessage: 'Turnier'
  },
  exercises: {
    id: `${scope}.exercises`,
    defaultMessage: 'Übungen'
  },
  loadingError: {
    id: `${scope}.loadingError`,
    defaultMessage: 'Was not able to load events. Try again later.'
  }
})
