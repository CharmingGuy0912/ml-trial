import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import CloseIcon from '@/components/atoms/Icon/Close'

/* eslint-disable react/jsx-props-no-spreading */
const MultiValueRemove = ({className, ...props}) => {
  const innerProps = {
    ...props.innerProps,
    className: classNames(
      props.innerProps.className,
      'hover:!bg-transparent !pl-0 text-gray-medium hover:!text-gray-dark/50',
      className
    )
  }

  return (
    <components.MultiValueRemove {...props} innerProps={innerProps}>
      <CloseIcon />
    </components.MultiValueRemove>
  )
}
/* eslint-enable */

MultiValueRemove.propTypes = {
  className: PropTypes.string,
  innerProps: PropTypes.shape({
    className: PropTypes.string
  }).isRequired
}

MultiValueRemove.defaultProps = {
  className: null
}

export default MultiValueRemove
