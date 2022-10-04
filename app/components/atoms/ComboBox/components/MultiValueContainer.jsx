import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const MultiValueContainer = ({children, className, ...props}) => {
  const innerProps = {
    ...props.innerProps,
    className: classNames(
      props.innerProps.className,
      'h-[18px] !bg-transparent border border-gray-medium !rounded !ml-0 !mr-[3px] !my-0',
      className
    )
  }

  return (
    <components.MultiValueContainer {...props} innerProps={innerProps}>
      {children}
    </components.MultiValueContainer>
  )
}
/* eslint-enable */

MultiValueContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  innerProps: PropTypes.shape({
    className: PropTypes.string
  }).isRequired
}

MultiValueContainer.defaultProps = {
  className: null
}

export default MultiValueContainer
