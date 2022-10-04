import classNames from 'classnames'
import PropTypes from 'prop-types'

const ModalFooterTemplate = ({children, className, slot}) => (
  <div
    className={classNames(
      'flex gap-4 justify-start',
      'flex-col md:flex-row-reverse md:items-center',
      'px-6 py-4 mb-1 sticky bottom-0 bg-white',
      className
    )}
  >
    <div className="flex gap-2 flex-col sm:flex-row-reverse md:items-center">
      {children}
    </div>
    {slot && (
      <div className="flex gap-2 flex-1 flex-col sm:flex-row">{slot}</div>
    )}
  </div>
)

ModalFooterTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  slot: PropTypes.node
}

ModalFooterTemplate.defaultProps = {
  className: null,
  slot: null
}

export default ModalFooterTemplate
