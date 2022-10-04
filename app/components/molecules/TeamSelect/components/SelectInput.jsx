import classNames from 'classnames'
import PropTypes from 'prop-types'

import Input from '@/components/atoms/ComboBox/components/Input'

/* eslint-disable react/jsx-props-no-spreading */
const SelectInput = ({children, ...props}) => (
  <Input className={classNames('!text-white !m-0 !p-0')} {...props}>
    {children}
  </Input>
)
/* eslint-enable */

SelectInput.propTypes = {
  children: PropTypes.node
}

SelectInput.defaultProps = {
  children: null
}

export default SelectInput
