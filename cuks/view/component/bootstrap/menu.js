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
    if (_.isArray(params)) params = { content: params }
    let attr = lib.attr(params)
    let content = `<div class="dropdown-menu ${params.align ? ('dropdown-menu-' + params.align) : ''}" ${attr} `
    content += '>\n'
    if (_.isPlainObject(params.content)) {
      _.forOwn(params.content, (v, k) => {
        content += `<h6 class="dropdown-header">${k}</h6>\n`
        content += buildMenu(v)
      })
    } else {
      content += buildMenu(params.content)
    }
    content += '</div>\n'

    return content
  }
}
