import deepFreeze from 'deep-freeze'

import defaultConfig from './default'

const config = {
  ...defaultConfig,
  env: 'development'
}

export default deepFreeze(config)
