const fs = require('fs')
const vm = require('vm')

const templateContext = vm.createContext({
  _: function (data) {
    return String(data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;')
  }
})

function createTemplate(templatePath) { // 使用vm模块传入模板路径，动态读取模板文件
  return vm.runInContext( 
    `(function render(data) {
      with (data) {
        return \`${fs.readFileSync(templatePath)}\`
      }
    })`,
    templateContext
  )
}

module.exports = createTemplate