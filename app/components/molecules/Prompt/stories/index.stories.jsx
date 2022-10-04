import {useEffect, useState} from 'react'

import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import PromptComponent from '@/components/molecules/Prompt'

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
      <Button onClick={() => setIsOpen(true)}>Open Prompt</Button>
      <PromptComponent
        isOpen={isOpen}
        onClose={onClose}
        actions={
          <>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
            <Button
              type={BUTTON_TYPES.OUTLINED}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </>
        }
        title={props.title}
      >
        {props.children}
      </PromptComponent>
    </>
  )
}

const Prompt = Template.bind({})
Prompt.args = {
  children: 'Prompt Content',
  isOpen: false,
  title: 'Prompt Title'
}

export {Prompt}
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
  component: PromptComponent,
  title: 'Design System/molecules/Prompt'
}
