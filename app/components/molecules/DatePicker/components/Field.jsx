import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {forwardRef} from 'react'
import {useIntl} from 'react-intl'

import DateFieldFrame from '@/components/atoms/DateFieldFrame'
import DateInput from '@/components/atoms/DateInput'

import messages from '../messages'

const Field = forwardRef((props, ref) => {
  const {formatMessage} = useIntl()

  return (
    <DateFieldFrame
      ref={ref}
      isOpen={props.isOpen}
      onCenterClick={props.open}
      onToggle={props.toggle}
    >
      <DateInput
        aria-label={formatMessage(messages.date)}
        onChange={props.onChange}
        onFocus={props.open}
        onSubmit={props.close}
        ref={props.inputRef}
        value={props.value}
      />
    </DateFieldFrame>
  )
})

Field.displayName = 'Field'

Field.propTypes = {
  close: PropTypes.func,
  inputRef: PropTypes.any,
  isOpen: PropTypes.bool,
  onChange: PropTypes.func,
  open: PropTypes.func,
  toggle: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

Field.defaultProps = {
  close: noop,
  inputRef: null,
  isOpen: false,
  onChange: noop,
  open: noop,
  toggle: noop,
  value: null
}

export default Field
