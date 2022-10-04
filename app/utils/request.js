import STATUS_CODES from '@/utils/status-codes'

const DEFAULT_OPTIONS = {
  mode: 'cors'
}

const parseJSON = response => response.json().catch(() => null)

const getText = response => response.text().catch(() => null)

const checkStatus = async response => {
  if (
    response.status >= STATUS_CODES.SUCCESS &&
    response.status < STATUS_CODES.MULTIPLE_CHOICES
  ) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  error.body = await parseJSON(response)
  throw error
}

const requestText = (url, options) =>
  fetch(url, {...DEFAULT_OPTIONS, ...options})
    .then(checkStatus)
    .then(getText)

const request = (url, options) =>
  fetch(url, {...DEFAULT_OPTIONS, ...options})
    .then(checkStatus)
    .then(parseJSON)

export {requestText, DEFAULT_OPTIONS}
export default request
