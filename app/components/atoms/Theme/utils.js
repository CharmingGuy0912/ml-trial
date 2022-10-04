const flattenObject = (sourceObject, separator = '-', keyPrefix = null) =>
  Object.entries(sourceObject).reduce((acc, [key, value]) => {
    const newKey = [keyPrefix, key].filter(Boolean).join(separator)

    if (typeof value === 'object') {
      return {
        ...acc,
        ...flattenObject(value, separator, newKey)
      }
    }

    return {
      ...acc,
      [newKey]: value
    }
  }, {})

const hexToRgb = hexColor =>
  hexColor
    .replace('#', '')
    .match(/.{1,2}/gu)
    .map(hexColorValue => parseInt(hexColorValue, 16))
    .join(' ')

export {flattenObject, hexToRgb}
