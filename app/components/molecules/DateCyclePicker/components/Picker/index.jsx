import {endOfWeek, isSameDay, isWithinInterval, startOfWeek} from 'date-fns'
import {isEqual} from 'lodash'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useCallback, useEffect, useMemo, useState} from 'react'

import Calendar from '@/components/molecules/Calendar'
import useSyncState from '@/hooks/use-sync-state'

import Footer from './Footer'

const useHoverModifier = () => {
  const [hoverDate, setHoverDate] = useState(null)
  const hoverInterval = useMemo(
    () => ({
      end: endOfWeek(hoverDate, {weekStartsOn: 1}),
      start: startOfWeek(hoverDate, {weekStartsOn: 1})
    }),
    [Number(hoverDate)]
  )

  const hoverModifiers = useMemo(
    () => ({
      /* eslint-disable camelcase */
      hover: date => Boolean(hoverDate) && isSameDay(date, hoverDate),
      hover_range: date =>
        Boolean(hoverDate) && isWithinInterval(date, hoverInterval),
      hover_range_end: date =>
        Boolean(hoverDate) && isSameDay(date, hoverInterval.end),
      hover_range_start: date =>
        Boolean(hoverDate) && isSameDay(date, hoverInterval.start)
      /* eslint-enable camelcase */
    }),
    [Number(hoverDate)]
  )

  const resetHoverDate = useCallback(() => setHoverDate(null), [setHoverDate])

  return {
    hoverModifiers,
    resetHoverDate,
    setHoverDate
  }
}

const Picker = props => {
  const [value, setValue] = useSyncState(props.value)
  const {hoverModifiers, resetHoverDate, setHoverDate} = useHoverModifier()

  const range = useMemo(
    () => ({
      from: value,
      to: endOfWeek(value, {weekStartsOn: 1})
    }),
    [value]
  )

  const onChange = useCallback(
    newDate => {
      const newValue = startOfWeek(newDate, {weekStartsOn: 1})

      if (props.isConfirmable) {
        setValue(newValue)
      } else {
        props.onChange(newValue)
        props.close()
      }
    },
    [props.isConfirmable, setValue, props.onChange, props.close]
  )

  const onConfirm = useCallback(() => {
    props.onChange(value)
    props.close()
  }, [props.close, value, props.onChange])

  useEffect(() => {
    if (!isEqual(value, props.value)) {
      setValue(props.value)
    }
  }, [props.value])

  return (
    <>
      <Calendar
        mode="range"
        modifiers={hoverModifiers}
        onChange={onChange}
        onChangeMonth={props.onChangeMonth}
        onDayMouseEnter={setHoverDate}
        onDayMouseLeave={resetHoverDate}
        value={range}
      />
      {props.isConfirmable && (
        <Footer onCancel={props.close} onConfirm={onConfirm} />
      )}
    </>
  )
}

Picker.propTypes = {
  close: PropTypes.func,
  isConfirmable: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeMonth: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

Picker.defaultProps = {
  close: noop,
  isConfirmable: true,
  onChange: noop,
  onChangeMonth: noop,
  value: null
}

export default Picker
