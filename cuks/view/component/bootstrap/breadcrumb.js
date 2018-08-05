'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    let content = '<nav aria-label="breadcrumb" ' + lib.attr(params, ['id', 'style', 'rel']) + '>\n'
    let wrapper = params.wrapper || {}
    content += `<ol class="breadcrumb ${wrapper.cls || ''}">\n`
    let items = _.isArray(params.items) ? params.items : []
    if (_.isPlainObject(params.items)) {
      _.forOwn(params.items, (v, k) => {
        items.push({ text: v, href: k })
      })
    }
    _.each(items, i => {
      content += `<li class="breadcrumb-item `
      if (i.active) content += 'active '
      if (i.cls) content += `${i.cls} `
      content += '" ' + lib.attr(i, ['id', 'rel', 'style']) + '>\n'
      if (i.href) {
        content += `<a href="${i.href}">${i.text}</a>\n`
      } else {
        content += `${i.text}\n`
      }
      content += '</li>\n'
    })
    content += '</ol>\n</nav>\n'

    return content
  }
}
