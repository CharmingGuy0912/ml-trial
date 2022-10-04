import {defineMessages} from 'react-intl'

const scope = 'molecules.date-cycle-picker'

export default defineMessages({
  from: {
    id: `${scope}.from`,
    defaultMessage: 'von',
    description: 'aria label from input'
  },
  to: {
    id: `${scope}.to`,
    defaultMessage: 'bis',
    description: 'aria label to input'
  },
  next: {
    id: `${scope}.next`,
    defaultMessage: 'nächste Woche',
    description: 'aria label next button'
  },
  prev: {
    id: `${scope}.prev`,
    defaultMessage: 'vorherige Woche',
    description: 'aria label prev button'
  }
})
