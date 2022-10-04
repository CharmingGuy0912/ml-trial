import classNames from 'classnames'
import PropTypes from 'prop-types'

import SingleValue from '@/components/atoms/ComboBox/components/SingleValue'

/* eslint-disable react/jsx-props-no-spreading */
const SelectValue = ({children, ...props}) => (
  <SingleValue className={classNames('!text-white !mb-px')} {...props}>
    {children}
  </SingleValue>
)
/* eslint-enable */

SelectValue.propTypes = {
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool
}

SelectValue.defaultProps = {
  isDisabled: false
}

export default SelectValue
