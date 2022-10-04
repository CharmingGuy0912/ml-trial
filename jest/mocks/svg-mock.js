const path = require('path');

module.exports = {
  process(src, filename) {
    const iconName = path.dirname(filename).split('/').slice(-1)

    return {
      code: `
        const React = require('react');
        module.exports = {
          __esModule: true,
          ReactComponent: (props) =>
            React.createElement('div', {...props, 'data-icon': '${iconName}'}, null),
          default: 'SVG_PATH',
        };
      `
    }
  }
}
