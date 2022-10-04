import {Popover} from '@headlessui/react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import ComboBox, {COMBO_BOX_PROP_TYPES} from '@/components/atoms/ComboBox'

import DropdownIndicator from './components/DropdownIndicator'

const ComboBoxButton = props => (
  <Popover className="relative">
    <Popover.Button as={props.as} isDisabled={props.isDisabled} />
    <Popover.Panel className="absolute top-0 w-full z-10">
      {({close}) => (
        <ComboBox
          className="w-full"
          options={props.options}
          onChange={next => props.onChange(close, next)}
          autoFocus
          menuIsOpen
          placeholder={props.placeholder}
          components={{
            DropdownIndicator,
            ...props.components
          }}
        />
      )}
    </Popover.Panel>
  </Popover>
)

ComboBoxButton.propTypes = {
  as: PropTypes.elementType.isRequired,
  components: PropTypes.object,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(COMBO_BOX_PROP_TYPES.OPTION),
  placeholder: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}

ComboBoxButton.defaultProps = {
  components: {},
  isDisabled: false,
  onChange: noop,
  options: [],
  placeholder: null
}

export default ComboBoxButton
