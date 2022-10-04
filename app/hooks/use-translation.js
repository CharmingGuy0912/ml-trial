import isObject from 'lodash/isObject'
import {useIntl} from 'react-intl'

const translate = (formatMessage, input) => {
  if (isObject(input) && input.id) {
    return formatMessage(input, input.values)
  }

  return input
}

const useTranslation = input => {
  const {formatMessage} = useIntl()
  return translate(formatMessage, input)
}

export {translate}

export default useTranslation
