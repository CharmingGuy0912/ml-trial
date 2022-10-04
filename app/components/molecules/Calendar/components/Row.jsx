import {isSameDay, isSameMonth} from 'date-fns'
import {memo} from 'react'
import {Row} from 'react-day-picker'

const propsAreEqual = (prevProps, nextProps) => {
  const isSameWeekNumber = prevProps.weekNumber === nextProps.weekNumber
  const isSameDisplayMonth = isSameMonth(
    prevProps.displayMonth,
    nextProps.displayMonth
  )
  const isSameDatesLength = prevProps.dates.length === nextProps.dates.length
  const areSameDates = prevProps.dates.every((prevDate, index) => {
    const nextDate = nextProps.dates[index]
    return isSameDay(prevDate, nextDate)
  })

  return (
    isSameWeekNumber && isSameDisplayMonth && isSameDatesLength && areSameDates
  )
}

export default memo(Row, propsAreEqual)
