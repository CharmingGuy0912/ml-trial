import {useEffect, useState} from 'react'

import Button from '@/components/atoms/Button'
import ModalComponent, {
  AVAILABLE_MODAL_COLORS,
  MODAL_COLORS
} from '@/components/atoms/Modal'

const Template = ({children, ...props}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = (...args) => {
    setIsOpen(...args)
    props.onClose(...args)
  }

  useEffect(() => {
    setIsOpen(props.isOpen)
  }, [props.isOpen])

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalComponent {...props} isOpen={isOpen} onClose={onClose}>
        {children}
      </ModalComponent>
    </>
  )
}

const Modal = Template.bind({})
Modal.args = {
  children: <div className="px-6 py-[18px]">Body content</div>,
  color: MODAL_COLORS.GRAY,
  footer: 'Footer Content',
  footerSlot: 'Footer slot',
  header: 'Header content',
  isOpen: false
}

export {Modal}
export default {
  argTypes: {
    color: {
      control: {type: 'select'},
      options: AVAILABLE_MODAL_COLORS
    },
    header: {
      control: {type: 'text'}
    },
    isOpen: {
      control: {type: 'boolean'}
    },
    onClose: {
      action: 'onClose'
    }
  },
  component: ModalComponent,
  title: 'Design System/atoms/Modal'
}
