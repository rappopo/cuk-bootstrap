'use strict'

module.exports = function (cuk) {
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = `<a href="${params.href || '#'}" class="${params.cls || ''} card-link" `
    content += `${lib.attr(params)}>${params.text || ''}</a>\n`
    return content
  }
}
