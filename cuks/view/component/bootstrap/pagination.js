'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let prevTxt = 'Previous'
    let nextTxt = 'Next'
    if (params.prev) {
      let txt = params.arrow ? ('<span aria-hidden="true">&laquo;</span><span class="sr-only">' + prevTxt + '</span>') : prevTxt
      params = _.merge(params, { prev: { text: txt } })
    }
    if (params.next) {
      let txt = params.arrow ? ('<span aria-hidden="true">&raquo;</span><span class="sr-only">' + nextTxt + '</span>') : nextTxt
      params = _.merge(params, { next: { text: txt } })
    }

    const page = (p, m) => {
      let content = `<li class="page-item ${params.cls || ''} ${lib.attr(p, ['disabled', 'active'])}">\n`
      content += `<a class="page-link" href="${p.href || '#'}" `
      if (m === 'prev') content += `aria-label="${prevTxt}" `
      if (m === 'next') content += `aria-label="${nextTxt}" `
      if (p.disabled) content += `tabindex="-1" `
      content += `>${p.text}\n`
      if (p.active && !m) content += `<span class="sr-only">(current)</span>`
      content += '</a></li>\n'
      return content
    }

    let content = `<nav aria-label="${params.ariaLabel || '...'}">\n`
    content += `<ul class="pagination `
    if (params.textSize) content += `pagination-${params.textSize} `
    if (params.align) content += `justify-content-${params.align} `
    if (params.cls) content += `${params.cls} `
    content += `" ${lib.attr(params)}>\n`
    if (params.prev) content += page(params.prev, 'prev')
    _.each(params.page, p => {
      if (!_.isPlainObject(p)) p = { text: p + '' }
      content += page(p)
    })
    if (params.next) content += page(params.next, 'next')
    content += '</ul></nav>\n'
    return content
  }
}
