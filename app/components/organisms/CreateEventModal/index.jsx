import React, {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import RoutedModal from '@/components/organisms/RoutedModal'
import {useRoutedModalContext} from '@/components/organisms/RoutedModal/context'
import {useEventTypeContext} from '@/contexts/EventType/context'
import {EVENT_COLORS} from '@/modules/event/results/types'

import Footer from './components/Footer'
import Header from './components/Header'


const FORM_ID = 'create-event-form'

const CreateEventModal = () => {
  const {close} = useRoutedModalContext()
  const {type} = useEventTypeContext()

  const formMethods = useForm()
  const {reset, handleSubmit, formState} = formMethods

  useEffect(() => {
    reset()
  }, [type])

  const onSubmit = handleSubmit(close)

  return (
    <RoutedModal
      header={<Header />}
      footer={
        <Footer
          close={close}
          formId={FORM_ID}
          onSubmit={onSubmit}
          isSubmittable={!formState.isSubmitted || formState.isValid}
        />
      }
      color={EVENT_COLORS[type]}
    >
      <FormProvider
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formMethods}
      >
        <form
          className="flex flex-col gap-4 p-6"
          onSubmit={onSubmit}
          id={FORM_ID}
        >
          <div className="font-heading-large">Form fields go here.</div>
        </form>
      </FormProvider>
    </RoutedModal>
  )
}

export default React.memo(CreateEventModal)
