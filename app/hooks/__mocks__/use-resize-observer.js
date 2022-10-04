import noop from 'lodash/noop'
import {useCallback} from 'react'

const useResizeObserver = jest.fn()
const callbacks = new Map()

useResizeObserver.mockImplementation(
  (resizeCallback = noop, unmountCallback = noop) => {
    const setRef = useCallback(node => {
      callbacks.set(node, {resizeCallback, unmountCallback})
    }, [])

    return [setRef]
  }
)

export {callbacks}

export default useResizeObserver
