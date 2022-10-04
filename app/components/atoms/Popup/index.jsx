import {Transition} from '@headlessui/react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {Fragment, forwardRef} from 'react'

const Popup = forwardRef(({children, isOpen, style, ...props}, ref) => (
  <Transition.Root show={isOpen} appear unmount>
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      ref={ref}
      role="dialog"
      style={style}
      tabIndex={-1}
      className={classNames('relative z-10', {'pointer-events-none': !isOpen})}
    >
      <Transition.Child
        as={Fragment}
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <div
          className="
            bg-white shadow rounded-b-lg rounded-tr-lg pt-1.5 pb-4
            motion-safe:transition motion-safe:duration-300
          "
        >
          {children}
        </div>
      </Transition.Child>
    </div>
  </Transition.Root>
))

Popup.displayName = 'Popup'

Popup.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  style: PropTypes.object
}

Popup.defaultProps = {
  children: null,
  isOpen: false,
  style: {}
}

export default Popup
