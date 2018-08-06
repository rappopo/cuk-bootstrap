'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let cls = params.cls || ''
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<textarea ${lib.attr(_.omit(params, ['value']), 'content')} class="form-control ${_.trim(cls)}">\n`
    content += params.value || ''
    content += '</textarea>\n'
    return content
  }
}
