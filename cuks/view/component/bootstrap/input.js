'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let cls = ''
    if (['radio', 'checkbox'].indexOf(params.type) === -1) {
      cls = params.plain ? 'form-control-plaintext ' : 'form-control '
    } else {
      cls = params.cls || ''
    }
    if (params.plain) params.readonly = true
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<input type="${params.type || 'text'}" ${lib.attr(params, 'content')} class="${_.trim(cls)}">\n`
    return content
  }
}
