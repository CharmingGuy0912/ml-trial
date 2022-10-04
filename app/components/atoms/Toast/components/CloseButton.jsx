import noop from 'lodash/noop'
import PropTypes from 'prop-types'

import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import CloseIcon from '@/components/atoms/Icon/Close'
import messages from '@/components/atoms/Toast/components/messages'
import useTranslation from '@/hooks/use-translation'
import customPropTypes from '@/utils/prop-types'

import {AVAILABLE_TOAST_TYPES, TOAST_TYPES} from './constants'

const CloseButton = ({onClick, onClose, text, type}) => {
  if (type === TOAST_TYPES.ACTION) {
    const message = useTranslation(text)

    return (
      <Button
        className="text-white hover:!bg-transparent my-[11px]"
        onClick={onClick}
        type={BUTTON_TYPES.OUTLINED}
      >
        {message}
      </Button>
    )
  }

  if (type === TOAST_TYPES.CLOSE_ACTION) {
    return (
      <CloseIcon
        className="text-gray-medium hover:text-white cursor-pointer"
        onClick={onClose}
      />
    )
  }

  return null
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  text: customPropTypes.Translatable,
  type: PropTypes.oneOf(AVAILABLE_TOAST_TYPES).isRequired
}

CloseButton.defaultProps = {
  onClick: noop,
  onClose: noop,
  text: messages.action
}

export default CloseButton
