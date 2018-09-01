'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let attr = lib.attr(params)
    let content = `<div class="card ${params.cls || ''} `
    if (params.context) content += `bg-${params.context} `
    if (params.textColor) content += `text-${params.textColor} `
    if (params.borderColor) content += `border-${params.borderColor} `
    content += `" ${attr}>`
    if (params.header) {
      const header = _.isPlainObject(params.header) ? params.header : { content: params.header }
      content += cmpt('cardHeader', header, ctx)
    }
    if (params.content) {
      const cnt = _.isArray(params.content) ? params.content : [params.content]
      _.each(cnt, c => {
        content += c + '\n'
      })
    }
    if (params.footer) {
      const footer = _.isPlainObject(params.footer) ? params.footer : { content: params.footer }
      content += cmpt('cardFooter', footer, ctx)
    }
    content += '</div>\n'

    return content
  }
}
