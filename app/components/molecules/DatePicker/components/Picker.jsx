import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useCallback} from 'react'

import Calendar from '@/components/molecules/Calendar'

const Picker = props => {
  const onChange = useCallback(
    (...args) => {
      props.onChange(...args)
      props.close()
    },
    [props.onChange, props.close]
  )

  return (
    <Calendar
      getEventsForDate={props.getEventsForDate}
      mode="single"
      onChange={onChange}
      value={props.value}
    />
  )
}

Picker.propTypes = {
  close: PropTypes.func,
  getEventsForDate: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

Picker.defaultProps = {
  close: noop,
  getEventsForDate: noop,
  onChange: noop,
  value: null
}

export default Picker
