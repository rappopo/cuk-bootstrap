'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let attr = lib.attr(params, 'textarea', ['name', 'value', 'readonly', 'disabled', 'placeholder', 'cols', 'rows'])
    let cls = params.cls || ''
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<textarea ${attr} class="form-control ${_.trim(cls)}">\n`
    content += params.value || ''
    content += '</textarea>\n'
    return content
  }
}
