import PropTypes from 'prop-types'
import React from 'react'

import ModalContainerTemplate from './Container'
import ModalFooterTemplate from './Footer'
import ModalHeaderTemplate from './Header'

const ModalTemplate = React.forwardRef(
  ({children, className, ...props}, ref) => (
    <ModalContainerTemplate ref={ref} className={className}>
      {props.header && (
        <ModalHeaderTemplate>{props.header}</ModalHeaderTemplate>
      )}
      {children}
      <ModalFooterTemplate slot={props.footerSlot}>
        {props.footer}
      </ModalFooterTemplate>
    </ModalContainerTemplate>
  )
)

ModalTemplate.displayName = 'ModalTemplate'

ModalTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  footer: PropTypes.node.isRequired,
  footerSlot: PropTypes.node,
  header: PropTypes.node
}

ModalTemplate.defaultProps = {
  className: null,
  footerSlot: null,
  header: null
}

export default ModalTemplate
