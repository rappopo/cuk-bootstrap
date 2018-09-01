'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let attr = lib.attr(params, 'range', ['name', 'value', 'readonly', 'disabled', 'placeholder'])
    let cls = `${params.custom ? 'custom-range' : 'form-control-range'} `
    if (params.cls) cls += `${params.cls} `
    if (params.textSize) cls += `form-control-${params.textSize} `
    if (params.textColor) cls += `content-${params.textColor} `
    let content = `<input type="range" ${attr} class="${_.trim(cls)}">\n`
    return content
  }
}
