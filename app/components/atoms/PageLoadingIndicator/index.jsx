import React from 'react'

import Spinner from '@/components/atoms/Spinner'

const PageLoadingIndicator = React.forwardRef((props, ref) => (
  <div ref={ref} className="w-full h-full flex justify-center items-center">
    <Spinner className="p-4 m-4" />
  </div>
))

PageLoadingIndicator.displayName = 'PageLoadingIndicator'

export default React.memo(PageLoadingIndicator)
