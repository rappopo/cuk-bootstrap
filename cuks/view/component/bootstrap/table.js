'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  const render = (tag, items) => {
    let content = ''
    let cls = ''
    let ttag = tag === 'tbody' ? 'td' : 'th'
    if (_.isArray(items)) items = { rows: items }
    cls = lib.cls(items)
    content += `<${tag} class="${cls}">\n`
    _.each(items.rows, r => {
      if (_.isArray(r)) r = { cols: r }
      cls = lib.cls(r)
      content += `<tr class="${cls}">`
      _.each(r.cols, c => {
        cls = lib.cls(c)
        content += `<${ttag} class="${cls}">`
        if (_.isString(c)) c = { content: c }
        content += `${c.content || ''}</${ttag}>`
      })
      content += `</tr>\n`
    })
    content += `</${tag}>\n`
    return content
  }

  return (params, ctx) => {
    let cls = lib.cls(params, null, {
      dark: `table-dark`,
      strip: `table-striped`,
      border: `table-bordered`,
      noBorder: `table-borderless`,
      hover: `table-hover`,
      compact: `table-sm`
    })
    let attr = lib.attr(params)
    let content = `<table class="table ${cls}" ${attr}>\n`
    if (params.header) content += render('thead', params.header)
    if (params.body) content += render('tbody', params.body)
    if (params.footer) content += render('tfoot', params.footer)
    content += `</table>\n`
    return content
  }
}
