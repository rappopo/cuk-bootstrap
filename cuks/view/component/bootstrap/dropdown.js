'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  const buildMenu = menu => {
    let result = ''
    _.each(menu, m => {
      if (_.isString(m)) m = { text: m }
      if (m.divider || m.text === '-') {
        result += `<div class="dropdown-divider"></div>\n`
      } else {
        result += `<a href="${m.href || '#'}" class="dropdown-item `
        if (m.active) result += 'active '
        if (m.disabled) result += 'disabled '
        result += `" ${lib.attr(m, ['id', 'style', 'rel'])}>\n`
        result += `${m.text}\n</a>`
      }
    })
    return result
  }

  return (params = {}, ctx) => {
    params.context = params.context || 'primary'
    let content = ''

    if (!params.noWrapper) {
      content += `<div class="dropdown `
      if (params.wrapperCls) content += `${params.wrapperCls} `
      if (params.dir) content += `drop${params.dir} `
      if (params.split) content += `btn-group `
      content += `" ${lib.attr(params, ['id', 'rel', 'style'])}>\n`
    }
    if (params.split) {
      content += `<button type="button" class="btn `
      if (params.context) content += `btn-${params.outline ? 'outline-' : ''}${params.context} `
      if (params.block) content += `btn-block `
      if (params.noWrapper) content += `" ${lib.attr(params, ['id', 'rel', 'style'])}`
      content += `">\n${params.title}\n</button>\n`
    }
    content += `<button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" `
    let cls = 'btn dropdown-toggle '
    if (params.split) cls += `dropdown-toggle-split `
    if (params.cls) cls += `${params.cls} `
    if (params.context) cls += `btn-${params.outline ? 'outline-' : ''}${params.context} `
    if (params.textSize) cls += `btn-${params.textSize} `
    content += `class="${cls}" `
    if (params.noWrapper && !params.split) content += `" ${lib.attr(params, ['id', 'rel', 'style'])}`
    content += '>\n'
    if (params.split) {
      content += '<span class="sr-only">Toggle Dropdown</span>\n'
    } else {
      content += params.title
    }
    content += '</button>\n'
    content += `<div class="dropdown-menu ${params.align ? ('dropdown-menu-' + params.align) : ''}" `
    if (params.id) content += `aria-labeledby="${params.id}-btn" `
    content += '>\n'
    if (_.isPlainObject(params.menu)) {
      _.forOwn(params.menu, (v, k) => {
        content += `<h6 class="dropdown-header">${k}</h6>\n`
        content += buildMenu(v)
      })
    } else {
      content += buildMenu(params.menu)
    }
    content += '</div>\n'
    if (!params.noWrapper) {
      content += '</div>\n'
    }

    return content
  }
}
