import {useRef, useState} from 'react'
import {usePopper} from 'react-popper'

const usePopup = options => {
  const referenceRef = useRef(null)
  const [popperElement, popperRef] = useState(null)
  const popper = usePopper(referenceRef.current, popperElement, options)

  return {
    popper,
    popperRef,
    referenceRef
  }
}

export default usePopup
