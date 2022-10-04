import classNames from 'classnames'
import PropTypes from 'prop-types'
import {useMemo} from 'react'
import {FormattedMessage} from 'react-intl'

import useTranslation from '@/hooks/use-translation'
import customPropTypes from '@/utils/prop-types'

import {
  AVAILABLE_TOAST_TYPES,
  AVAILABLE_TOAST_VARIANTS,
  TOAST_TYPES
} from './constants'
import messages from './messages'

const Message = ({text, type, variant}) => {
  const isDescription = type === TOAST_TYPES.DESCRIPTION
  const toastMessage = useTranslation(text)
  const message = useMemo(() => messages[variant], [variant])

  return (
    <div
      className={classNames('-ml-1', {
        'flex flex-col pt-1 pb-1.5': isDescription
      })}
    >
      <span
        className={classNames('font-bold inline-flex gap-0.5', {
          'text-base': !isDescription
        })}
      >
        <FormattedMessage {...message} />
        {!isDescription && (
          <>
            {' '}
            <FormattedMessage {...messages.alert} />
          </>
        )}
      </span>
      <span className="text-base">
        {!isDescription && ' - '}
        {toastMessage}
      </span>
    </div>
  )
}

Message.propTypes = {
  text: customPropTypes.Translatable,
  type: PropTypes.oneOf(AVAILABLE_TOAST_TYPES).isRequired,
  variant: PropTypes.oneOf(AVAILABLE_TOAST_VARIANTS).isRequired
}

Message.defaultProps = {
  text: messages.action
}

export default Message
