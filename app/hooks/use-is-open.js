import {useCallback, useState} from 'react'

const useIsOpen = (initial = false) => {
  const [isOpen, setIsOpen] = useState(initial)

  const events = {
    close: useCallback(() => {
      setIsOpen(false)
    }, [setIsOpen]),
    open: useCallback(() => {
      setIsOpen(true)
    }, [setIsOpen]),
    toggle: useCallback(() => {
      setIsOpen(current => !current)
    }, [setIsOpen])
  }

  return [isOpen, events]
}

export default useIsOpen
