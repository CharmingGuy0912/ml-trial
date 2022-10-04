import classNames from 'classnames'
import PropTypes from 'prop-types'
import {components} from 'react-select'

/* eslint-disable react/jsx-props-no-spreading */
const IndicatorsContainer = ({children, className, ...props}) => (
  <components.IndicatorsContainer
    className={classNames(
      {
        'h-5 m-auto': props.isMulti
      },
      className
    )}
    {...props}
  >
    {children}
  </components.IndicatorsContainer>
)
/* eslint-enable */

IndicatorsContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isMulti: PropTypes.bool
}

IndicatorsContainer.defaultProps = {
  className: null,
  isMulti: false
}

export default IndicatorsContainer
