'use strict'

module.exports = function(cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let cls = params.plain ? 'form-control-plaintext ' : 'form-control '
    if (params.plain) params.readonly = true
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<input type="content" ${lib.attr(params, 'content')} class="${_.trim(cls)}">`
    return content
  }

}