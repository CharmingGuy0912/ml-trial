import FocusTrap from 'focus-trap-react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {forwardRef, useCallback} from 'react'

import Popup from '@/components/atoms/Popup'
import useIsOpen from '@/hooks/use-is-open'
import usePopup from '@/hooks/use-popup'
import useSyncState from '@/hooks/use-sync-state'

import Field from './components/Field'
import Picker from './components/Picker'

const DatePicker = forwardRef((props, ref) => {
  const [isOpen, {close, open, toggle}] = useIsOpen()
  const [value, setValue] = useSyncState(props.value)
  const {popper, referenceRef, popperRef} = usePopup({
    placement: 'bottom-start'
  })

  const onChange = useCallback(
    newDate => {
      props.onChange(newDate)
      setValue(newDate)
    },
    [props.onChange, setValue]
  )

  return (
    <FocusTrap
      active={isOpen}
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        initialFocus: false,
        onDeactivate: close,
        returnFocusOnDeactivate: false
      }}
    >
      <div>
        <Field
          ref={referenceRef}
          close={close}
          inputRef={ref}
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
            getEventsForDate={props.getEventsForDate}
            onChange={onChange}
            value={value}
          />
        </Popup>
      </div>
    </FocusTrap>
  )
})

DatePicker.displayName = 'DatePicker'

DatePicker.propTypes = {
  getEventsForDate: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date)
}

DatePicker.defaultProps = {
  getEventsForDate: noop,
  onChange: noop,
  value: null
}

export default DatePicker
