import {useEffect, useState} from 'react'

import Button from '@/components/atoms/Button'
import DialogComponent from '@/components/atoms/Dialog'

const Template = props => {
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
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <DialogComponent isOpen={isOpen} onClose={onClose}>
        <div className="bg-white transform inline-block sm:align-middle">
          {props.children}
        </div>
      </DialogComponent>
    </>
  )
}

const Dialog = Template.bind({})
Dialog.args = {
  children: 'Dialog Content',
  isOpen: false,
  title: 'Dialog Title'
}

export {Dialog}
export default {
  argTypes: {
    children: {
      control: {type: 'text'}
    },
    isOpen: {
      control: {type: 'boolean'}
    },
    onClose: {
      action: 'onClose'
    },
    title: {
      control: {type: 'text'}
    }
  },
  component: DialogComponent,
  title: 'Design System/atoms/Dialog'
}
