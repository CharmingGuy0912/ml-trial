import {defineMessages} from 'react-intl'

const scope = 'molecules.calendar'

export default defineMessages({
  selectMonth: {
    id: `${scope}.selectMonth`,
    defaultMessage: 'Monat auswählen'
  },
  selectYear: {
    id: `${scope}.selectYear`,
    defaultMessage: 'Jahr auswählen'
  },
  nextMonth: {
    id: `${scope}.nextMonth`,
    defaultMessage: 'nächstes Monat',
    description: 'aria label nextMonth button'
  },
  prevMonth: {
    id: `${scope}.prevMonth`,
    defaultMessage: 'vorheriges Monat',
    description: 'aria label prevMonth button'
  }
})
