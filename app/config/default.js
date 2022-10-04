import deepFreeze from 'deep-freeze'

import features from './features'

const config = {
  env: 'default',

  services: {},

  features
}

export default deepFreeze(config)
