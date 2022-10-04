import {Outlet} from '@tanstack/react-location'
import React from 'react'

import Header from '@/components/organisms/Header'
import PageTemplate from '@/components/templates/Page'

const PageHusk = () => (
  <PageTemplate header={<Header />}>
    <Outlet />
  </PageTemplate>
)

export default React.memo(PageHusk)
