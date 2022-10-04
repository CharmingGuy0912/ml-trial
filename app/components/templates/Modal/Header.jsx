import classNames from 'classnames'
import PropTypes from 'prop-types'

const ModalHeaderTemplate = ({children, className}) => (
  <div className={classNames('px-6 py-[18px]', className)}>{children}</div>
)

ModalHeaderTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ModalHeaderTemplate.defaultProps = {
  className: null
}

export default ModalHeaderTemplate
