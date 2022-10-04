const TOAST_VARIANTS = {
  ERROR: 'error',
  SUCCESS: 'success'
}

const AVAILABLE_TOAST_VARIANTS = Object.values(TOAST_VARIANTS)

const TOAST_TYPES = {
  ACTION: 'action',
  BASIC: 'basic',
  CLOSE_ACTION: 'close',
  DESCRIPTION: 'description'
}

const AVAILABLE_TOAST_TYPES = Object.values(TOAST_TYPES)

export {
  AVAILABLE_TOAST_TYPES,
  AVAILABLE_TOAST_VARIANTS,
  TOAST_TYPES,
  TOAST_VARIANTS
}
