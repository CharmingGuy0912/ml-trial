import React, {Suspense} from 'react'

const loadable = (importFunc, {fallback = null} = {}) => {
  const LazyComponent = React.lazy(importFunc)

  const SuspendedComponent = props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )

  return SuspendedComponent
}

export default loadable
