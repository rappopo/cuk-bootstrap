'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let cls = (params.cls || '') + ' '
    let attr = lib.attr(params, 'input', ['name', 'value', 'readonly', 'disabled', 'placeholder', 'checked'])
    if (['radio', 'checkbox'].indexOf(params.type) === -1) {
      cls += params.plain ? 'form-control-plaintext ' : 'form-control '
    }
    if (params.plain) params.readonly = true
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<input type="${params.type || 'text'}" ${attr} class="${_.trim(cls)}">\n`
    return content
  }
}
