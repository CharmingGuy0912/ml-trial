import noop from 'lodash/noop'
import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'

import Button, {BUTTON_TYPES} from '@/components/atoms/Button'
import SaveIcon from '@/components/atoms/Icon/Save'
import commonMessages from '@/components/common-messages'

const Footer = ({close, formId, isSubmittable, onSubmit}) => (
  <>
    <Button
      startIcon={<SaveIcon />}
      onClick={onSubmit}
      isDisabled={!isSubmittable}
      buttonType="submit"
      form={formId}
    >
      <FormattedMessage {...commonMessages.save} />
    </Button>
    <Button type={BUTTON_TYPES.OUTLINED} onClick={close}>
      <FormattedMessage {...commonMessages.cancel} />
    </Button>
  </>
)

Footer.propTypes = {
  close: PropTypes.func,
  formId: PropTypes.string.isRequired,
  isSubmittable: PropTypes.bool,
  onSubmit: PropTypes.func
}

Footer.defaultProps = {
  close: noop,
  isSubmittable: false,
  onSubmit: noop
}

export default React.memo(Footer)
