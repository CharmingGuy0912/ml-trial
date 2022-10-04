import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const ModalContainerTemplate = React.forwardRef(
  ({children, className}, ref) => (
    <div
      className={classNames(
        'min-w-[421px] w-fit shadow bg-white',
        'flex flex-col text-left',
        'border border-white rounded divide-y divide-black/10',
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
)

ModalContainerTemplate.displayName = 'ModalContainerTemplate'

ModalContainerTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

ModalContainerTemplate.defaultProps = {
  className: null
}

export default ModalContainerTemplate
