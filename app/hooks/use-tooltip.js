import {useEffect, useState} from 'react'
import {usePopper} from 'react-popper'

import useIsOpen from './use-is-open'
import useUpdateEffect from './use-update-effect'

const useTooltip = ({
  placement = 'bottom',
  horizontalOffset = 0,
  updateDependencies = [],
  verticalOffset = 0
} = {}) => {
  const [isVisible, events] = useIsOpen(false)

  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)
  const {attributes, styles, update} = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: [
        {name: 'offset', options: {offset: [horizontalOffset, verticalOffset]}}
      ],
      placement
    }
  )

  useEffect(() => {
    const listeners = {
      focusIn: () => events.open(),
      focusOut: () => events.close(),
      mouseEnter: () => events.open(),
      mouseLeave: () => events.close()
    }

    Object.entries(listeners).forEach(([eventName, listener]) => {
      referenceElement?.addEventListener(eventName.toLowerCase(), listener)
    })

    return () => {
      Object.entries(listeners).forEach(([eventName, listener]) => {
        referenceElement?.removeEventListener(eventName.toLowerCase(), listener)
      })
    }
  }, [referenceElement])

  const setTooltipRefs = tooltipNode => {
    if (tooltipNode?.previousSibling) {
      setReferenceElement(tooltipNode.previousSibling)
      setPopperElement(tooltipNode)
    }
  }

  useUpdateEffect(() => {
    update()
  }, updateDependencies)

  return {
    attributes,
    isVisible,
    setTooltipRefs,
    styles,
    update
  }
}

export default useTooltip
