import React, {useCallback} from 'react'
import {FormattedMessage} from 'react-intl'
import {useDispatch, useSelector} from 'react-redux'

import Button from '@/components/atoms/Button'
import CounterInjector from '@/injectors/ui/counter'
import {actions, selectors} from '@/modules/ui/counter'

import messages from './messages'

const Counter = () => {
  const dispatch = useDispatch()

  const onClick = useCallback(() => {
    dispatch(actions.increment())
  }, [dispatch])

  const onReset = useCallback(() => {
    dispatch(actions.reset())
  }, [dispatch])

  const count = useSelector(selectors.selectCount)

  return (
    <>
      <CounterInjector />
      <p className="flex gap-2">
        <Button onClick={onClick}>
          <FormattedMessage {...messages.count} values={{count}} />
        </Button>
        <Button onClick={onReset}>
          <FormattedMessage {...messages.reset} />
        </Button>
      </p>
    </>
  )
}

export default React.memo(Counter)
