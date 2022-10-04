import classNames from 'classnames'
import {omit} from 'lodash'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useCallback, useState} from 'react'

import WarningAmberIcon from '@/components/atoms/Icon/WarningAmber'
import useSyncState from '@/hooks/use-sync-state'
import useTranslation from '@/hooks/use-translation'
import propTypes from '@/utils/prop-types'

const Input = ({component: Component, children, ...props}) => {
  const placeholder = useTranslation(props.placeholder)
  const [value, setValue] = useSyncState(props.value)
  const [hasFocus, setHasFocus] = useState(props.autoFocus)
  const onFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const onBlur = useCallback(() => setHasFocus(false), [setHasFocus])
  const onChange = useCallback(
    event => {
      props.onChange(event.target.value)
      setValue(event.target.value)
    },
    [props.onChange, setValue]
  )

  const passThroughProps = omit(props, [
    'className',
    'hasError',
    'inputRef',
    'isDisabled',
    'isRequired',
    'onChange',
    'placeholder',
    'startIcon',
    'value'
  ])

  return (
    <Component
      className={classNames(
        props.className,
        'border rounded transition inline-flex items-center relative overflow-hidden',
        /* eslint-disable sort-keys */
        {
          'border-gray-medium hover:border-white hover:bg-silver hover:shadow':
            !hasFocus,
          'border-white bg-white shadow': hasFocus,
          'border-primary hover:border-primary': props.hasError,
          'border-gray-medium hover:bg-transparent hover:shadow-none cursor-not-allowed':
            props.isDisabled,
          'hover:border-gray-medium': !props.isDisabled && props.hasError
        }
        /* eslint-enable sort-keys */
      )}
    >
      {Boolean(props.startIcon || props.hasError) && (
        <div
          className={classNames(
            'flex absolute left-0 top-[7px] ml-2.5 mr-[-7px]',
            'text-lg pointer-events-none',
            {
              'text-primary': props.hasError
            }
          )}
        >
          {Boolean(props.startIcon && !props.hasError) && props.startIcon}
          {Boolean(props.hasError) && <WarningAmberIcon />}
        </div>
      )}

      <input
        className={classNames(
          'border-0 px-[0.6875rem] py-1.5 w-full',
          'bg-transparent text-gray-dark placeholder-gray-medium focus:outline-none',
          /* eslint-disable sort-keys */
          {
            'text-base': props.type !== 'number',
            'number-input font-button-text peer pl-[0.5625rem] pr-0.5':
              props.type === 'number',
            'pl-8':
              props.hasError || (props.startIcon && props.type !== 'number'),
            'pl-7':
              (props.hasError || props.startIcon) && props.type === 'number',
            'text-gray-medium cursor-not-allowed': props.isDisabled
          }
          /* eslint-enable sort-keys */
        )}
        disabled={props.isDisabled}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        required={props.isRequired}
        value={value}
        placeholder={placeholder}
        ref={props.inputRef}
        {...passThroughProps}
      />

      {children}
    </Component>
  )
}

Input.propTypes = {
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  hasError: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({current: PropTypes.any})
  ]),
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  max: PropTypes.string,
  min: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: propTypes.Translatable,
  startIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

Input.defaultProps = {
  autoFocus: false,
  children: null,
  className: null,
  component: 'label',
  hasError: false,
  inputRef: null,
  isDisabled: false,
  isRequired: false,
  max: null,
  min: null,
  onChange: noop,
  onKeyDown: noop,
  placeholder: null,
  startIcon: null,
  type: null,
  value: ''
}

export default Input
