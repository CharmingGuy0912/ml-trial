import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import Dialog from '@/components/atoms/Dialog'
// eslint-disable-next-line atomic-design-hierarchy/hierarchical-import
import ModalTemplate from '@/components/templates/Modal'

const MODAL_COLORS = {
  BLUE: 'blue',
  GRAY: 'gray',
  GREEN: 'green',
  ORANGE: 'orange',
  RED: 'red'
}
const AVAILABLE_MODAL_COLORS = Object.values(MODAL_COLORS)

const BACKGROUND_CLASS = {
  [MODAL_COLORS.BLUE]: 'bg-gradient-blue',
  [MODAL_COLORS.GRAY]: 'bg-gradient-gray',
  [MODAL_COLORS.GREEN]: 'bg-gradient-green',
  [MODAL_COLORS.ORANGE]: 'bg-gradient-orange',
  [MODAL_COLORS.RED]: 'bg-gradient-red'
}

const Modal = ({children, ...props}) => (
  <Dialog
    isOpen={props.isOpen}
    initialFocus={props.initialFocus}
    onClose={props.onClose}
  >
    <span className="transform inline-block sm:align-middle">
      <ModalTemplate
        ref={props.setReference}
        className={classNames(
          'bg-gradient-to-b max-w-[calc(100vw_-_1.5rem)] my-3',
          BACKGROUND_CLASS[props.color],
          props.className
        )}
        footer={props.footer}
        footerSlot={props.footerSlot}
        header={props.header}
      >
        {children}
      </ModalTemplate>
    </span>
  </Dialog>
)

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
  color: PropTypes.oneOf(AVAILABLE_MODAL_COLORS),
  footer: PropTypes.node.isRequired,
  footerSlot: PropTypes.node,
  header: PropTypes.node,
  initialFocus: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  setReference: PropTypes.func
}

Modal.defaultProps = {
  className: null,
  color: MODAL_COLORS.GRAY,
  footerSlot: null,
  header: null,
  initialFocus: null,
  isOpen: false,
  onClose: noop,
  setReference: noop
}

export {AVAILABLE_MODAL_COLORS, MODAL_COLORS}

export default Modal
