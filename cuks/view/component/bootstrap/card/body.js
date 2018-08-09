'use strict'

module.exports = function (cuk) {
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = ''
    if (!params.noWrapper) {
      content = `<div class="card-body ${params.cls || ''} `
      if (params.context) content += `bg-${params.context} `
      if (params.textColor) content += `text-${params.textColor} `
      content += `" ${lib.attr(params)}>\n`
    }
    if (params.title) content += `<h5 class="card-title ${params.titleCls || ''}">${params.title || ''}</h5>\n`
    if (params.subtitle) content += `<h6 class="card-subtitle ${params.subtitleCls || ''}">${params.subtitle || ''}</h6>\n`
    content += (params.content || '')
    if (!params.noWrapper) content += `</div>\n`
    return content
  }
}
