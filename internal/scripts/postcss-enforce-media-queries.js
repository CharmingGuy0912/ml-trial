module.exports = ({className = 'enforce-desktop'} = {}) => {
  return {
    postcssPlugin: 'postcss-enforce-media-queries',
    AtRuleExit: {
      media: atRule => {
        // Only handle min-width media queries. Ignore others like prefers-reduced-motion, etc.
        if (atRule.params.includes('min-width')){
          atRule.after(atRule.nodes.map(node => node.clone({selector: `.${className} ${node.selector}`})))
        }
      }
    }
  }
}
module.exports.postcss = true
