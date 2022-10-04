import {useEffect, useRef} from 'react'

const useUpdateEffect = (effect, dependencies) => {
  const isMount = useRef(true)

  useEffect(() => {
    if (isMount.current) {
      isMount.current = false
    } else {
      effect()
    }
  }, dependencies)
}

export default useUpdateEffect
