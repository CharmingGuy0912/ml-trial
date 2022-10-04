import {isSameMonth, startOfMonth} from 'date-fns'
import de from 'date-fns/locale/de'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from 'react'
import {DayPicker} from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import Caption from './components/Caption'
import Day from './components/Day'
import Row from './components/Row'

const CURRENT_YEAR = new Date().getFullYear()

const getMonthFromValue = (value, fallback = null) => {
  if (value instanceof Date) {
    return value
  }

  if (value?.from instanceof Date) {
    return value.from
  }

  return fallback
}

const Calendar = props => {
  const [month, setMonth] = useState(getMonthFromValue(props.value, new Date()))

  const onMonthChange = useCallback(value => {
    setMonth(value)
    props.onChangeMonth(value)
  }, [])

  useEffect(() => {
    props.onChangeMonth(startOfMonth(month))
  }, [])

  useEffect(() => {
    const value = getMonthFromValue(props.value)

    if (value && !isSameMonth(month, value)) {
      onMonthChange(value)
    }
  }, [props.value])

  return (
    <DayPicker
      classNames={{
        /* eslint-disable camelcase */
        cell: 'rdp-cell specific:w-10 specific:h-8 specific:text-[18px] specific:leading-[21px] specific:pb-2',
        head_cell:
          'rdp-head_cell specific:w-10 specific:h-7 specific:text-[11px] specific:leading-[13px]',
        root: 'rdp specific:m-0',
        table: 'rdp-table specific:mx-6'
        /* eslint-enable camelcase */
      }}
      components={{
        Caption,
        Day,
        Row
      }}
      fromYear={props.fromYear}
      locale={de}
      mode={props.mode}
      modifiers={props.modifiers}
      month={month}
      onDayClick={props.onChange}
      onDayMouseEnter={props.onDayMouseEnter}
      onDayMouseLeave={props.onDayMouseLeave}
      onMonthChange={onMonthChange}
      selected={props.value}
      showOutsideDays
      toYear={props.toYear}
    />
  )
}

Calendar.propTypes = {
  fromYear: PropTypes.number,
  mode: PropTypes.string,
  modifiers: PropTypes.object,
  onChange: PropTypes.func,
  onChangeMonth: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  toYear: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date)
    })
  ])
}

Calendar.defaultProps = {
  // eslint-disable-next-line no-magic-numbers
  fromYear: CURRENT_YEAR - 50,
  mode: 'single',
  modifiers: null,
  onChange: noop,
  onChangeMonth: noop,
  onDayMouseEnter: noop,
  onDayMouseLeave: noop,
  // eslint-disable-next-line no-magic-numbers
  toYear: CURRENT_YEAR + 50,
  value: null
}

export default Calendar
