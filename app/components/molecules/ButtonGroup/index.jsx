import classNames from 'classnames'
import PropTypes from 'prop-types'

import {
  BUTTON_TYPES,
  BUTTON_TYPES_BACKGROUND_CLASSES
} from '@/components/atoms/Button'

import ButtonGroupContext from './context'

const ButtonGroup = props => (
  <ButtonGroupContext.Provider
    value={{isDisabled: props.isDisabled, type: props.type}}
  >
    <div
      className={classNames(
        'inline-flex rounded',
        BUTTON_TYPES_BACKGROUND_CLASSES[props.type],
        {
          'divide-gray-light':
            props.type === BUTTON_TYPES.CONTAINED && props.isDisabled,
          'divide-primary':
            props.type === BUTTON_TYPES.CONTAINED && !props.isDisabled,
          'divide-x': props.type === BUTTON_TYPES.CONTAINED
        },
        props.className
      )}
    >
      {props.children}
    </div>
  </ButtonGroupContext.Provider>
)

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES))
}

ButtonGroup.defaultProps = {
  children: null,
  className: null,
  isDisabled: false,
  type: BUTTON_TYPES.CONTAINED
}

export default ButtonGroup
