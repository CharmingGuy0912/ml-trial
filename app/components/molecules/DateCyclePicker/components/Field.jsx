import {addWeeks, endOfWeek, startOfWeek, subWeeks} from 'date-fns'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {forwardRef, useCallback, useMemo} from 'react'
import {useIntl} from 'react-intl'

import DateFieldFrame from '@/components/atoms/DateFieldFrame'
import DateInput from '@/components/atoms/DateInput'

import messages from '../messages'

import DirectionButton, {DIRECTIONS} from './DirectionButton'

const useDateCycle = value => {
  const startDate = useMemo(
    () => startOfWeek(value, {weekStartsOn: 1}),
    [value]
  )
  const endDate = useMemo(() => endOfWeek(value, {weekStartsOn: 1}), [value])
  return [startDate, endDate]
}

const Field = forwardRef((props, ref) => {
  const {formatMessage} = useIntl()
  const [startDate, endDate] = useDateCycle(props.value)

  const onPrevClick = useCallback(() => {
    const newDate = subWeeks(props.value, 1)
    props.onChange(newDate)
  }, [props.onChange, props.value])

  const onNextClick = useCallback(() => {
    const newDate = addWeeks(props.value, 1)
    props.onChange(newDate)
  }, [props.onChange, props.value])

  return (
    <DateFieldFrame
      ref={ref}
      isOpen={props.isOpen}
      onCenterClick={props.open}
      onToggle={props.toggle}
      previousButton={
        <DirectionButton
          aria-label={formatMessage(messages.prev)}
          direction={DIRECTIONS.LEFT}
          onClick={onPrevClick}
        />
      }
      nextButton={
        <DirectionButton
          aria-label={formatMessage(messages.next)}
          direction={DIRECTIONS.RIGHT}
          onClick={onNextClick}
        />
      }
    >
      <DateInput
        aria-label={formatMessage(messages.from)}
        onChange={props.onChange}
        onFocus={props.open}
        onSubmit={props.close}
        value={startDate}
      />

      <div className="w-3.5 flex justify-center items-center font-bold">-</div>

      <DateInput
        aria-label={formatMessage(messages.to)}
        onChange={props.onChange}
        onFocus={props.open}
        onSubmit={props.close}
        value={endDate}
      />
    </DateFieldFrame>
  )
})

Field.displayName = 'Field'

Field.propTypes = {
  close: PropTypes.func,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  open: PropTypes.func,
  toggle: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

Field.defaultProps = {
  close: noop,
  isOpen: false,
  onChange: noop,
  open: noop,
  toggle: noop,
  value: null
}

export default Field
