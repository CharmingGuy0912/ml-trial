import React from 'react'
import {FormattedMessage} from 'react-intl'

import messages from '@/components/organisms/CreateEventModal/messages'

const Header = () => (
  <span className="font-heading-large">
    <FormattedMessage {...messages.title} />
  </span>
)

export default React.memo(Header)
