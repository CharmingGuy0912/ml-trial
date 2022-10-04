import {Dialog as HeadlessDialog} from '@headlessui/react'
import classNames from 'classnames'
import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import Dialog from '@/components/atoms/Dialog'

const Prompt = props => (
  <Dialog
    isOpen={props.isOpen}
    onClose={props.onClose}
    initialFocus={props.initialFocus}
  >
    <div
      className={classNames(
        'inline-block align-bottom bg-white rounded-lg',
        'text-left overflow-hidden shadow-xl transform',
        'motion-safe:transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
      )}
    >
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <HeadlessDialog.Title as="h3" className="font-heading-large">
            {props.title}
          </HeadlessDialog.Title>
          <div className="mt-2">
            <p className="font-text">{props.children}</p>
          </div>
        </div>
      </div>
      <div className="bg-background/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
        {props.actions}
      </div>
    </div>
  </Dialog>
)

Prompt.propTypes = {
  actions: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  initialFocus: PropTypes.shape({current: PropTypes.instanceOf(Element)}),
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.node.isRequired
}

Prompt.defaultProps = {
  initialFocus: null,
  isOpen: false,
  onClose: noop
}

export default Prompt
