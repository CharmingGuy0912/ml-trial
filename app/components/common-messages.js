import {defineMessages} from 'react-intl'

const scope = 'common-messages'

export default defineMessages({
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Speichern',
    description: 'cta to save changes'
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Abbrechen',
    description: 'cta to cancel something, e.g. a modal'
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Löschen',
    description: 'cta to delete something'
  },
  apply: {
    id: `${scope}.apply`,
    defaultMessage: 'Anwenden',
    description: 'cta to apply something, e.g. a date picker'
  },
  required: {
    id: `${scope}.required`,
    defaultMessage: 'Pflichtfeld',
    description: 'required field'
  },
  loading: {
    id: `${scope}.loading`,
    defaultMessage: 'Wird geladen...',
    description: 'status description for screen readers only'
  },
  today: {
    id: `${scope}.today`,
    defaultMessage: 'Heute'
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Suchen ...'
  },
  sort: {
    id: `${scope}.sort`,
    defaultMessage: 'Sortieren'
  },
  ascending: {
    id: `${scope}.ascending`,
    defaultMessage: 'Aufsteigend'
  },
  descending: {
    id: `${scope}.descending`,
    defaultMessage: 'Absteigend'
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: 'Filtern'
  }
})
