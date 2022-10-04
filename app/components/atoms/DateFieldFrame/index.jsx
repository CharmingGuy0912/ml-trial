import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {forwardRef, useCallback} from 'react'
import {useIntl} from 'react-intl'

import ArrowDropDownIcon from '@/components/atoms/Icon/ArrowDropDown'
import DateRangeIcon from '@/components/atoms/Icon/DateRange'

import messages from './messages'

const DateFieldFrame = forwardRef((props, ref) => {
  const {formatMessage} = useIntl()

  const onToggle = useCallback(
    event => {
      event.stopPropagation()
      props.onToggle()
    },
    [props.onToggle]
  )

  return (
    <div
      ref={ref}
      className={classNames(
        'border border-gray-medium divide-x divide-gray-medium rounded inline-flex transition cursor-pointer',
        'hover:border-white hover:divide-white hover:bg-silver hover:shadow-md specific:divider-gray-light',
        {
          'specific:border-white specific:divide-gray-light specific:bg-white':
            props.isOpen,
          'specific:shadow specific:rounded-b-none': props.isOpen
        }
      )}
    >
      {props.previousButton}

      <div
        className={classNames('flex items-center py-1 transition', {
          'pl-1.5': Boolean(props.previousButton),
          'pl-3': !props.previousButton,
          'pr-1.5': Boolean(props.nextButton),
          'pr-2': !props.nextButton
        })}
        onClick={props.onCenterClick}
      >
        <DateRangeIcon className="text-lg mr-1" />

        {props.children}

        <button
          aria-label={formatMessage(messages.toggle)}
          className="transition text-gray-medium hover:text-gray-dark"
          onClick={onToggle}
        >
          <ArrowDropDownIcon
            className={classNames('text-2xl', {'-rotate-180': props.isOpen})}
          />
        </button>
      </div>

      {props.nextButton}
    </div>
  )
})

DateFieldFrame.displayName = 'DateFieldFrame'

DateFieldFrame.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  nextButton: PropTypes.node,
  onCenterClick: PropTypes.func,
  onToggle: PropTypes.func,
  previousButton: PropTypes.node
}

DateFieldFrame.defaultProps = {
  children: null,
  isOpen: false,
  nextButton: null,
  onCenterClick: noop,
  onToggle: noop,
  previousButton: null
}

export default DateFieldFrame
