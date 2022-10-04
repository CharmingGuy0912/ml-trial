import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {useMemo} from 'react'

import ModalComponent from '@/components/atoms/Modal'

import {useRoutedModalContext} from './context'

const RoutedModal = ({children, isPersistent, modal: Modal, ...props}) => {
  const {close, isOpen, setReference} = useRoutedModalContext()

  const onClose = useMemo(() => {
    if (isPersistent) {
      return noop
    }
    return close
  }, [isPersistent, close])

  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      setReference={setReference}
      {...props}
    >
      {children}
    </Modal>
  )
  /* eslint-enable */
}

RoutedModal.propTypes = {
  children: PropTypes.node,
  isPersistent: PropTypes.bool,
  modal: PropTypes.elementType
}

RoutedModal.defaultProps = {
  children: null,
  isPersistent: false,
  modal: ModalComponent
}

export default RoutedModal
