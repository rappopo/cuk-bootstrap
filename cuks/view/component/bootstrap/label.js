'use strict'

module.exports = function (cuk) {
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let attr = lib.attr(params, 'label', ['for'])
    let content = `<label ${attr} `
    if (params.cls) content += `class="${params.cls}" `
    content += `>${params.content}</label>`
    return content
  }
}
