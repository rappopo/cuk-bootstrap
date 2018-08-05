'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    let content = ''
    if (params.wrapper) {
      let cls = 'container '
      if (params.wrapper.fullWidth) cls += 'pl-0 pr-0 '
      if (params.wrapper.cls) cls += `${params.wrapper.cls} `
      content += `<div class="${_.trim(cls)}">\n`
    }
    _.each(params.rows, r => {
      if (_.isArray(r)) r = { cols: r }
      let cls = 'row '
      if (r.noGutter) cls += 'no-gutters '
      if (r.valign) cls += 'align-items-' + r.valign
      if (r.align) cls += 'justify-content-' + r.align
      if (r.cls) cls += r.cls
      content += `<div class="${_.trim(cls)}" ${lib.attr(r, ['id', 'style'])}>\n`
      _.each(r.cols, c => {
        if (_.isString(c)) c = { content: c }
        if (c.break) {
          content += '<div class="w-100"></div>\n'
        } else {
          let cls = `col${c.width ? ('-' + c.width) : ''} `
          if (c.order) cls += `order-${c.order} `
          if (c.offset) cls += `offset-${c.offset} `
          if (c.cls) cls += c.cls
          content += `<div class="${_.trim(cls)}" ${lib.attr(c, ['id', 'style'])}>${c.content}</div>\n`
        }
      })
      content += '</div>\n'
    })
    if (params.wrapper) {
      content += '</div>\n'
    }
    return content
  }
}
