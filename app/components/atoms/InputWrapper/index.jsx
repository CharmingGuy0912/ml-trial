import classNames from 'classnames'
import PropTypes from 'prop-types'

import useTranslation from '@/hooks/use-translation'
import propTypes from '@/utils/prop-types'

const InputWrapper = ({component: Component, ...props}) => {
  const label = useTranslation(props.label)
  const error = useTranslation(props.error)
  const hasError = Boolean(props.error)

  return (
    <Component
      className={classNames('block text-base', props.className, {
        'text-gray-medium cursor-not-allowed': props.isDisabled,
        'text-primary': hasError
      })}
    >
      <div className="font-label mb-1.5">
        {label}
        {props.isRequired && (
          <span
            className={classNames({
              'text-gray-medium': !hasError,
              'text-primary': hasError && !props.isDisabled
            })}
          >
            *
          </span>
        )}
      </div>

      {props.children}

      {hasError && <div className="text-xs mt-1.5">{error}</div>}
    </Component>
  )
}

InputWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.elementType,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    propTypes.MessageShape
  ]),
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: propTypes.Translatable
}

InputWrapper.defaultProps = {
  children: null,
  className: null,
  component: 'label',
  error: null,
  isDisabled: false,
  isRequired: false,
  label: null
}

export default InputWrapper
