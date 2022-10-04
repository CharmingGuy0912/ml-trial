import classNames from 'classnames'
import {toast} from 'react-toastify'

import WarningAmberIcon from '@/components/atoms/Icon/WarningAmber'

import CloseButton from './CloseButton'
import Message from './Message'
import {TOAST_TYPES, TOAST_VARIANTS} from './constants'

const error = ({
  actionText,
  onActionClick,
  text,
  type = TOAST_TYPES.CLOSE_ACTION
}) => {
  const isDescription = type === TOAST_TYPES.DESCRIPTION

  return toast.error(
    <Message text={text} type={type} variant={TOAST_VARIANTS.ERROR} />,
    {
      autoClose: false,
      closeButton: ({closeToast}) => (
        <CloseButton
          onClick={onActionClick}
          onClose={closeToast}
          text={actionText}
          type={type}
        />
      ),
      hideProgressBar: true,
      icon: () => (
        <div className={classNames({'pt-[3px]': isDescription})}>
          <WarningAmberIcon />
        </div>
      ),
      position: 'bottom-center'
    }
  )
}

export default error
