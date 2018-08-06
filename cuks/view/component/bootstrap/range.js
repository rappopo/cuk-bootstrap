'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let cls = `${params.custom ? 'custom-range' : 'form-control-range'} `
    if (params.cls) cls += `${params.cls} `
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<input type="range" ${lib.attr(params, 'range')} class="${_.trim(cls)}">\n`
    return content
  }
}
