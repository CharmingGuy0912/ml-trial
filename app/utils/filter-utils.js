const notEmpty = entry => {
  if (typeof entry === 'string') {
    return Boolean(entry?.trim())
  }
  return Boolean(entry)
}

// eslint-disable-next-line import/prefer-default-export
export {notEmpty}
