import React, {useCallback, useRef} from 'react'
import {FormattedMessage} from 'react-intl'
import {useRegisterSW} from 'virtual:pwa-register/react'

import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import Prompt from '@/components/molecules/Prompt'

import messages from './messages'

function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker
  } = useRegisterSW()

  const confirmButtonRef = useRef()

  const onClose = useCallback(() => {
    setNeedRefresh(false)
  }, [setNeedRefresh])

  const onRefresh = useCallback(() => {
    updateServiceWorker(true)
    onClose()
  }, [updateServiceWorker])

  return (
    <Prompt
      title={<FormattedMessage {...messages.title} />}
      initialFocus={confirmButtonRef}
      isOpen={needRefresh}
      onClose={onClose}
      actions={
        <>
          <Button ref={confirmButtonRef} onClick={onRefresh}>
            <FormattedMessage {...messages.refresh} />
          </Button>
          <Button onClick={onClose} type={BUTTON_TYPES.OUTLINED}>
            <FormattedMessage {...messages.cancel} />
          </Button>
        </>
      }
    >
      <FormattedMessage {...messages.content} />
    </Prompt>
  )
}

export default React.memo(ReloadPrompt)
