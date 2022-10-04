import {isSameDay, isSameMonth} from 'date-fns'
import PropTypes from 'prop-types'
import {memo, useRef} from 'react'
import {useDayRender} from 'react-day-picker'

import DayButton from './DayButton'

const Day = props => {
  const buttonRef = useRef(null)
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef)

  // istanbul ignore next
  if (dayRender.isHidden) {
    return <></>
  }

  // istanbul ignore next
  if (!dayRender.isButton) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <div {...dayRender.divProps} />
  }

  return (
    <DayButton
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...dayRender.buttonProps}
      ref={buttonRef}
      activeModifiers={dayRender.activeModifiers}
      date={props.date}
    />
  )
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  displayMonth: PropTypes.instanceOf(Date).isRequired
}

const propsAreEqual = (prevProps, nextProps) =>
  isSameDay(prevProps.date, nextProps.date) &&
  isSameMonth(prevProps.displayMonth, nextProps.displayMonth)

export default memo(Day, propsAreEqual)
