import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'

import commonMessages from '@/components/common-messages'

const SPINNER_TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary'
}

const SPINNER_TYPES_CLASSES = {
  [SPINNER_TYPES.PRIMARY]: 'border-primary/20 border-l-primary',
  [SPINNER_TYPES.SECONDARY]: 'border-gray-light border-l-gray-medium'
}

const Spinner = ({className, type}) => (
  <div
    className={classNames(
      'animate-spin',
      'rounded-full w-8 h-8',
      'border-4',
      SPINNER_TYPES_CLASSES[type],
      className
    )}
    role="status"
  >
    <span className="sr-only">
      <FormattedMessage {...commonMessages.loading} />
    </span>
  </div>
)

Spinner.propTypes = {
  className: PropTypes.any,
  type: PropTypes.oneOf(Object.values(SPINNER_TYPES))
}

Spinner.defaultProps = {
  className: null,
  type: SPINNER_TYPES.PRIMARY
}

export {SPINNER_TYPES}
export default React.memo(Spinner)
