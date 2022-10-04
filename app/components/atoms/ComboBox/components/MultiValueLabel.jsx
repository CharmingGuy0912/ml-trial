import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const MultiValueLabel = ({children, className, ...props}) => {
  const innerProps = {
    ...props.innerProps,
    className: classNames(
      props.innerProps.className,
      'px-[5px] !py-0 inline-flex items-center',
      className
    )
  }

  return (
    <components.MultiValueLabel {...props} innerProps={innerProps}>
      {children}
    </components.MultiValueLabel>
  )
}
/* eslint-enable */

MultiValueLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  innerProps: PropTypes.shape({
    className: PropTypes.string
  }).isRequired
}

MultiValueLabel.defaultProps = {
  className: null
}

export default MultiValueLabel
