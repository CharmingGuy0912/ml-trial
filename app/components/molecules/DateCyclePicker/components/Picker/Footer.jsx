import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'

import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import commonMessages from '@/components/common-messages'

const Footer = props => (
  <div className="flex justify-end gap-2 mx-6 pt-1.5">
    <Button onClick={props.onCancel} type={BUTTON_TYPES.OUTLINED}>
      <FormattedMessage {...commonMessages.cancel} />
    </Button>
    <Button onClick={props.onConfirm} type={BUTTON_TYPES.CONTAINED}>
      <FormattedMessage {...commonMessages.apply} />
    </Button>
  </div>
)

Footer.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func
}

Footer.defaultProps = {
  onCancel: noop,
  onConfirm: noop
}

export default Footer
