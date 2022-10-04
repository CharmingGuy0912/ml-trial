import classNames from 'classnames'
import {toast} from 'react-toastify'

import InfoIcon from '@/components/atoms/Icon/Info'

import CloseButton from './CloseButton'
import Message from './Message'
import {TOAST_TYPES, TOAST_VARIANTS} from './constants'

const success = ({actionText, onActionClick, text, type}) => {
  const isDescription = type === TOAST_TYPES.DESCRIPTION

  return toast.success(
    <Message text={text} type={type} variant={TOAST_VARIANTS.SUCCESS} />,
    {
      closeButton: ({closeToast}) => (
        <CloseButton
          onClick={onActionClick}
          onClose={closeToast}
          text={actionText}
          type={type}
        />
      ),
      hideProgressBar: true,
      icon: (
        <div className={classNames({'pt-[3px]': isDescription})}>
          <InfoIcon />
        </div>
      ),
      position: 'bottom-center'
    }
  )
}
export default success
