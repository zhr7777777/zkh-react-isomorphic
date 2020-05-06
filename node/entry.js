require('@babel/polyfill') // 使用import引入组件必须包含polyfill和preset-env

require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"], 
  plugins: [
    // "@babel/syntax-dynamic-import",
    // "dynamic-import-node"
  ]
})

const path = require('path')
const WebpackIsomorphicTools = require('webpack-isomorphic-tools')

const projectBasePath = path.resolve(__dirname, '../browser/')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../browser/config/webpack-isomorphic-tools-configuration')).server(projectBasePath, function () {
  require('./index')
})


// require('./index')