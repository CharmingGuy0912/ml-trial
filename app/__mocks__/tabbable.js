const lib = jest.requireActual('tabbable')

const focusable = (node, options) =>
  lib.focusable(node, {...options, displayCheck: 'none'})
const isFocusable = (node, options) =>
  lib.isFocusable(node, {...options, displayCheck: 'none'})
const isTabbable = (node, options) =>
  lib.isTabbable(node, {...options, displayCheck: 'none'})
const tabbable = (node, options) =>
  lib.tabbable(node, {...options, displayCheck: 'none'})

export {focusable, isFocusable, isTabbable, tabbable}
