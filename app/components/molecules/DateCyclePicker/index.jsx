import {startOfWeek} from 'date-fns'
import FocusTrap from 'focus-trap-react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useCallback} from 'react'

import Popup from '@/components/atoms/Popup'
import useIsOpen from '@/hooks/use-is-open'
import usePopup from '@/hooks/use-popup'
import useSyncState from '@/hooks/use-sync-state'

import Field from './components/Field'
import Picker from './components/Picker'

const DateCyclePicker = props => {
  const [isOpen, {close, open, toggle}] = useIsOpen()
  const [value, setValue] = useSyncState(props.value)
  const {popper, referenceRef, popperRef} = usePopup({
    placement: 'bottom-start'
  })

  const onChange = useCallback(
    newDate => {
      const newValue = startOfWeek(newDate, {weekStartsOn: 1})
      props.onChange(newValue)
      setValue(newValue)
    },
    [props.onChange, setValue, props.value]
  )

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        allowOutsideClick: true,
        initialFocus: false,
        onDeactivate: close,
        returnFocusOnDeactivate: false
      }}
    >
      <div>
        <Field
          ref={referenceRef}
          close={close}
          isOpen={isOpen}
          onChange={onChange}
          open={open}
          toggle={toggle}
          value={value}
        />

        <Popup
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...popper.attributes.popper}
          ref={popperRef}
          style={popper.styles.popper}
          isOpen={isOpen}
        >
          <Picker
            close={close}
            isConfirmable={props.isConfirmable}
            onChange={onChange}
            onChangeMonth={props.onChangeMonth}
            value={value}
          />
        </Popup>
      </div>
    </FocusTrap>
  )
}

DateCyclePicker.propTypes = {
  isConfirmable: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeMonth: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

DateCyclePicker.defaultProps = {
  isConfirmable: true,
  onChange: noop,
  onChangeMonth: noop,
  value: null
}

export default DateCyclePicker
