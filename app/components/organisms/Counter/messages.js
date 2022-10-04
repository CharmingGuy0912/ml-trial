import {defineMessages} from 'react-intl'

const scope = 'organisms.counter'

export default defineMessages({
  count: {
    id: `${scope}.count`,
    defaultMessage: 'Zähler: {count}',
    description: 'count output'
  },
  reset: {
    id: `${scope}.reset`,
    defaultMessage: 'Zurücksetzen',
    description: 'reset cta'
  }
})
