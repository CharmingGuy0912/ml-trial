import React from 'react'

const CenterGhost = () => (
  <span
    className="hidden sm:inline-block sm:align-middle sm:h-screen"
    aria-hidden="true"
  >
    &#8203;
  </span>
)

export default React.memo(CenterGhost)
