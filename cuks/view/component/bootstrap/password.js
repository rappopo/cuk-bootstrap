'use strict'

module.exports = function(cuk) {
  const { _, helper } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let cls = 'form-control '
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `text-${params.textColor} `
    let text = `<input type="password" ${lib.attr(params)} class="${cls}">`
    return text
  }

}