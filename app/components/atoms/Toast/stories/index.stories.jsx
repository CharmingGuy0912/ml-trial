import Button from '@/components/atoms/Button'
import ToastContainer from '@/components/atoms/ToastContainer'

import {
  AVAILABLE_TOAST_TYPES,
  TOAST_TYPES,
  TOAST_VARIANTS
} from '../components/constants'
import toast from '../index'

const Template = props => {
  const onSuccess = toast({
    variant: TOAST_VARIANTS.SUCCESS,
    ...props
  })
  const onError = toast({
    variant: TOAST_VARIANTS.ERROR,
    ...props
  })

  return (
    <div className="flex gap-2">
      <ToastContainer />
      <Button onClick={onSuccess}>Success</Button>
      <Button onClick={onError}>Error</Button>
    </div>
  )
}

const Toast = Template.bind({})
Toast.args = {
  text: 'Lorem Ipsum dolar sat!',
  type: TOAST_TYPES.BASIC
}

export {Toast}
export default {
  argTypes: {
    actionText: {
      control: {type: 'text'}
    },
    onActionClick: {
      action: 'onActionClick'
    },
    text: {
      control: {type: 'text'}
    },
    type: {
      control: {type: 'select'},
      options: AVAILABLE_TOAST_TYPES
    }
  },
  component: <div />,
  title: 'Design System/atoms/Toast'
}
