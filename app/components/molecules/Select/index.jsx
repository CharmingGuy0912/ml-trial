import omit from 'lodash/omit'
import PropTypes from 'prop-types'
import React from 'react'

import ComboBox from '@/components/atoms/ComboBox'
import InputWrapper from '@/components/atoms/InputWrapper'
import propTypes from '@/utils/prop-types'

const Select = React.forwardRef((props, ref) => {
  const passThroughProps = omit(props, [
    'className',
    'error',
    'isRequired',
    'label'
  ])

  return (
    <InputWrapper
      className={props.className}
      error={props.error}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
      label={props.label}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ComboBox ref={ref} isSearchable={false} {...passThroughProps} />
    </InputWrapper>
  )
})

Select.displayName = 'Select'

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    propTypes.MessageShape
  ]),
  hideSelectedOptions: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: propTypes.Translatable
}

Select.defaultProps = {
  className: null,
  error: null,
  hideSelectedOptions: false,
  isDisabled: false,
  isMulti: false,
  isRequired: true,
  label: null
}

export default Select
