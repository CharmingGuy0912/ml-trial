import PropTypes from 'prop-types'

const Prompt = props => (
  <div>
    {props.isOpen && (
      <>
        <div>{props.title}</div>
        <div>{props.children}</div>
        <div>{props.actions}</div>
      </>
    )}
  </div>
)

Prompt.propTypes = {
  actions: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.node.isRequired
}

export default Prompt
