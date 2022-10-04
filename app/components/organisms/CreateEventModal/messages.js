import {defineMessages} from 'react-intl'

const scope = 'organisms.create-event-modal'

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Ereignis hinzufügen',
    description: 'title of the create-event modal'
  },
  noteLabel: {
    id: `${scope}.noteLabel`,
    defaultMessage: 'Bemerkung',
    description: 'the note input label'
  },
  spaceRequestLabel: {
    id: `${scope}.spaceRequestLabel`,
    defaultMessage: 'Platzwunsch',
    description: 'the space request select label'
  },
  secondSpaceRequestLabel: {
    id: `${scope}.secondSpaceRequestLabel`,
    defaultMessage: 'Platzwunsch 2',
    description: 'the second space request select label'
  },
  spaceLabel: {
    id: `${scope}.spaceLabel`,
    defaultMessage: 'Platz',
    description: 'the assigned space label'
  },
  secondSpaceLabel: {
    id: `${scope}.secondSpaceLabel`,
    defaultMessage: 'Platz 2',
    description: 'the second assigned space label'
  },
  startTimeLabel: {
    id: `${scope}.startTimeLabel`,
    defaultMessage: 'Start',
    description: 'the assigned start time'
  },
  endTimeLabel: {
    id: `${scope}.endTimeLabel`,
    defaultMessage: 'Ende',
    description: 'the assigned end time'
  },
  durationQuickSelect: {
    id: `${scope}.durationQuickSelect`,
    defaultMessage: 'Dauer Schnellauswahl',
    description: 'label for duration quick selection'
  },
  recurringEvent: {
    id: `${scope}.recurringEvent`,
    defaultMessage: 'Serientermin',
    description: 'button text for recurring event'
  },
  date: {
    id: `${scope}.date`,
    defaultMessage: 'Datum',
    description: 'label for date'
  }
})
