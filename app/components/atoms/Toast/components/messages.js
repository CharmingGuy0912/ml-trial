import {defineMessages} from 'react-intl'

const scope = 'atoms.toast'

export default defineMessages({
  success: {
    id: `${scope}.success`,
    defaultMessage: 'Info'
  },
  error: {
    id: `${scope}.error`,
    defaultMessage: 'Error or Warning'
  },
  alert: {
    id: `${scope}.alert`,
    defaultMessage: 'alert'
  },
  action: {
    id: `${scope}.action`,
    defaultMessage: 'Action'
  }
})
