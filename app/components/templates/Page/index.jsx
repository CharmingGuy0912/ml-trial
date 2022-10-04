import classNames from 'classnames'
import PropTypes from 'prop-types'

const PageTemplate = props => (
  <div
    className={classNames(
      'flex flex-col h-full',
      'bg-background overflow-x-auto',
      props.className
    )}
  >
    {props.header}
    <div className="flex-1 overflow-y-auto">{props.children}</div>
    {props.footer}
  </div>
)

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  footer: PropTypes.node,
  header: PropTypes.node
}

PageTemplate.defaultProps = {
  className: null,
  footer: null,
  header: null
}

export default PageTemplate
