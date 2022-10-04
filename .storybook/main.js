const path = require('path')
const {mergeConfig} = require('vite')
const svgrPlugin = require('vite-plugin-svgr')
const kebabCase = require('lodash/kebabCase')

module.exports = {
  core: {
    builder: "@storybook/builder-vite"
  },
  stories: [
    '../app/**/*.stories.mdx',
    '../app/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
  async viteFinal(config, { configType }) {
    console.log(__dirname)
    // return the customized config
    return mergeConfig(config, {
      resolve: {
        alias: [{
          find: '@/config',
          replacement: () => {
            const appEnv = process.env.APP_ENV || 'default'
            const config = kebabCase(appEnv)
            return path.resolve(__dirname, `../app/config/${config}.js`)
          }
        }, {
          find: '@',
          replacement: path.resolve(__dirname, '../app/')
        }]
      },
      plugins: [
        svgrPlugin.default()
      ]
    });
  },
}
