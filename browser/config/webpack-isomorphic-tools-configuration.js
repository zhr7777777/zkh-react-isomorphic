const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const path = require('path')

// const config = require('../config/');

const basePath = path.resolve(__dirname, '..')

module.exports = {
  webpack_assets_file_path: `${basePath}/webpack-assets.json`,
  webpack_stats_file_path: `${basePath}/webpack-stats.json`,
  assets: {
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
    },
    fonts: {
      extensions: ['woff', 'woff2', 'eot', 'ttf', 'swf', 'otf']
    }
  }
}