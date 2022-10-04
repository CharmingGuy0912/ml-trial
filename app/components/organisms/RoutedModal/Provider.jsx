import PropTypes from 'prop-types'
import {useEffect, useMemo, useState} from 'react'
import {useDispatch} from 'react-redux'
import {goBack} from 'redux-first-history'

import RoutedModalContext from '@/components/organisms/RoutedModal/context'
import useIsOpen from '@/hooks/use-is-open'

const RoutedModalProvider = ({children}) => {
  const [isOpen, events] = useIsOpen(true)
  const [reference, setReference] = useState({})

  const dispatch = useDispatch()
  useEffect(() => {
    if (!reference) {
      dispatch(goBack())
    }
  }, [reference])

  const value = useMemo(
    () => ({
      close: events.close,
      isOpen,
      setReference
    }),
    [isOpen, events.close, setReference]
  )

  return (
    <RoutedModalContext.Provider value={value}>
      {children}
    </RoutedModalContext.Provider>
  )
}

RoutedModalProvider.propTypes = {
  children: PropTypes.node
}

RoutedModalProvider.defaultProps = {
  children: null
}

export default RoutedModalProvider
