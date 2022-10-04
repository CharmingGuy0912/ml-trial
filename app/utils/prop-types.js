import PropTypes from 'prop-types'

const MessageShape = PropTypes.shape({
  defaultMessage: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
})

const Translatable = PropTypes.oneOfType([PropTypes.string, MessageShape])

const propTypes = {
  MessageShape,
  Translatable
}

export default propTypes
