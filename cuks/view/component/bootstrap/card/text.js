'use strict'

module.exports = function (cuk) {
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = `<p class="${params.cls || ''} card-text" `
    content += `${lib.attr(params)}>${params.content || ''}</p>\n`
    return content
  }
}
