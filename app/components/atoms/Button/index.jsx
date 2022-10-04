import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import React, {useContext, useMemo} from 'react'

import Spinner, {SPINNER_TYPES} from '@/components/atoms/Spinner'
// eslint-disable-next-line atomic-design-hierarchy/hierarchical-import
import ButtonGroupContext from '@/components/molecules/ButtonGroup/context'

import IconHolder from './IconHolder'
import BUTTON_SIZES from './sizes'

const BUTTON_SIZES_CLASSES = {
  [BUTTON_SIZES.MEDIUM]: 'min-h-[28px] min-w-[28px]',
  [BUTTON_SIZES.SMALL]: 'min-w-[24px] min-h-[18px]'
}

const BUTTON_TYPES = {
  CONTAINED: 'contained',
  OUTLINED: 'outlined'
}

const BUTTON_TYPES_TEXT_CLASSES = {
  [BUTTON_TYPES.CONTAINED]: 'text-white',
  [BUTTON_TYPES.OUTLINED]: 'text-gray-dark border border-gray-medium'
}

const BUTTON_TYPES_BACKGROUND_CLASSES = {
  [BUTTON_TYPES.CONTAINED]: 'shadow bg-gradient-to-l bg-gradient-primary',
  [BUTTON_TYPES.OUTLINED]: 'bg-transparent'
}

const BUTTON_TYPES_HOVER_CLASSES = {
  [BUTTON_TYPES.CONTAINED]: [
    'relative overflow-hidden isolate',
    'before:bg-gray-dark before:absolute before:inset-0 before:z-[-1] before:opacity-0 before:transition-opacity',
    'hover:shadow-md hover:before:opacity-100'
  ],
  [BUTTON_TYPES.OUTLINED]: 'hover:shadow-md hover:bg-silver hover:border-white'
}

const BUTTON_TYPES_DISABLED_CLASSES = {
  [BUTTON_TYPES.CONTAINED]:
    'disabled:bg-gray-medium disabled:bg-none disabled:text-gray-light disabled:shadow-none',
  [BUTTON_TYPES.OUTLINED]: 'disabled:text-gray-medium'
}

const Button = React.forwardRef((props, ref) => {
  const groupData = useContext(ButtonGroupContext)
  const type = groupData?.type ?? props.type
  const isDisabled = groupData?.isDisabled ?? props.isDisabled
  const isGrouped = Boolean(groupData)
  const hasChildren = Boolean(props.children)
  const hasBorder = type === BUTTON_TYPES.OUTLINED
  const spinnerType = useMemo(() => {
    if (props.isDisabled) {
      return SPINNER_TYPES.PRIMARY
    }
    return SPINNER_TYPES.SECONDARY
  }, [props.isDisabled])

  return (
    <button
      ref={ref}
      className={classNames(
        'inline-flex justify-center gap-1 font-button-text items-center transition',
        'focus-visible:outline-dashed focus-visible:outline-primary focus-visible:outline-offset-1',
        'disabled:pointer-events-none specificity-up:bg-blue-100',
        props.className,
        BUTTON_SIZES_CLASSES[props.size],
        BUTTON_TYPES_TEXT_CLASSES[type],
        BUTTON_TYPES_HOVER_CLASSES[type],
        BUTTON_TYPES_DISABLED_CLASSES[type],
        !isGrouped && BUTTON_TYPES_BACKGROUND_CLASSES[type],
        /* eslint-disable sort-keys,quote-props */
        {
          'first:rounded-l last:rounded-r bg-transparent': isGrouped,
          'border-r-0 last:border-r': isGrouped && hasBorder,
          rounded: !isGrouped,
          'px-3': props.size === BUTTON_SIZES.MEDIUM && hasChildren,
          'px-2.5': props.size === BUTTON_SIZES.SMALL && hasChildren,
          'specific:bg-white specific:text-gray-dark specific:border-white shadow':
            props.isSelected,

          // Reduce vertical padding bc of border
          'py-[0.4375rem] ': props.size === BUTTON_SIZES.MEDIUM && !hasBorder,
          'py-0.5 ': props.size === BUTTON_SIZES.SMALL && !hasBorder,
          'py-1.5': props.size === BUTTON_SIZES.MEDIUM && hasBorder,
          'py-[0.0625rem]': props.size === BUTTON_SIZES.SMALL && hasBorder
        }
        /* eslint-enable sort-keys,quote-props */
      )}
      type={props.buttonType}
      onClick={props.onClick}
      disabled={isDisabled}
      form={props.form}
      id={props.id}
      onKeyDown={props.onKeyDown}
    >
      {props.isLoading && (
        <Spinner
          type={spinnerType}
          className="specific:w-4 specific:h-4 specific:border-2 mx-3"
        />
      )}
      {!props.isLoading && (
        <>
          <IconHolder
            isLonely={!props.children && !props.endIcon}
            size={props.size}
          >
            {props.startIcon}
          </IconHolder>

          {props.children}

          <IconHolder
            isLonely={!props.children && !props.startIcon}
            size={props.size}
          >
            {props.endIcon}
          </IconHolder>
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

Button.propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.any,
  endIcon: PropTypes.node,
  form: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  startIcon: PropTypes.node,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES))
}

Button.defaultProps = {
  buttonType: 'button',
  children: null,
  className: null,
  endIcon: null,
  form: null,
  id: null,
  isDisabled: false,
  isLoading: false,
  isSelected: false,
  onClick: noop,
  onKeyDown: noop,
  size: BUTTON_SIZES.MEDIUM,
  startIcon: null,
  type: BUTTON_TYPES.CONTAINED
}

export {BUTTON_SIZES, BUTTON_TYPES, BUTTON_TYPES_BACKGROUND_CLASSES}
export default Button
