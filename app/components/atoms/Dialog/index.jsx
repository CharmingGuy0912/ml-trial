import {Dialog as HeadlessDialog, Transition} from '@headlessui/react'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {Fragment} from 'react'

import CenterGhost from './CenterGhost'

const Dialog = props => (
  <Transition.Root show={props.isOpen} as={Fragment} appear>
    <HeadlessDialog
      as="div"
      className="fixed z-50 inset-0 overflow-y-scroll"
      initialFocus={props.initialFocus}
      onClose={props.onClose}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out motion-safe:duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in motion-safe:duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <HeadlessDialog.Overlay className="fixed inset-0 bg-backdrop/30 motion-safe:transition-opacity" />
        </Transition.Child>

        <CenterGhost />
        <Transition.Child
          as={Fragment}
          enter="ease-out motion-safe:duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in motion-safe:duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          {props.children}
        </Transition.Child>
      </div>
    </HeadlessDialog>
  </Transition.Root>
)

Dialog.propTypes = {
  children: PropTypes.node.isRequired,
  initialFocus: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
}

Dialog.defaultProps = {
  initialFocus: null,
  isOpen: false,
  onClose: noop
}

export default Dialog
