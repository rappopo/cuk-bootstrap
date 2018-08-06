'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)

    let content = `<ul class="list-group `
    if (params.noBorder) content += `list-group-flush `
    content += '">\n'
    _.each(params.items, item => {
      item = _.isPlainObject(item) ? item : { text: item }
      content += `<${item.href ? 'a' : 'li'} class="list-group-item `
      if (item.disabled) content += `disabled `
      if (item.active) content += `active `
      if (item.context) content += `list-group-item-${item.context} `
      if (item.badge) content += `d-flex justify-content-between align-items-center `
      if (item.cls) content += `${item.cls} `
      content += `" `
      if (item.href) content += `href="${item.href || '#'}" `
      content += `${lib.attr(item)}>\n${item.text}\n`
      if (item.badge) {
        let badge = _.isPlainObject(item.badge) ? item.badge : { text: item.badge }
        content += cmpt('badge', badge, ctx)
      }
      content += `</${item.href ? 'a' : 'li'}>\n`
    })
    content += '</ul>\n'
    return content
  }
}
