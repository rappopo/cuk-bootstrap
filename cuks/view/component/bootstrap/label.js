'use strict'

module.exports = function (cuk) {
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let content = `<label ${lib.attr(params)} `
    if (params.cls) content += `class="${params.cls}" `
    content += `>${params.content}</label>`
    return content
  }
}
