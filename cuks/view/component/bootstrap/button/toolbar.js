'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    if (_.isArray(params)) params = { groups: params }
    let content = `<div class="btn-toolbar${params.stacked ? '-vertical' : ''} `
    if (params.cls) content += `${params.cls}" `
    content += 'role="toolbar" ' + lib.attr(params) + '>\n'
    _.each(params.groups || [], g => {
      if (_.isPlainObject(g)) {
        content += cmpt('buttonGroup', g, ctx)
      } else {
        content += g
      }
    })
    content += '</div>\n'
    return content
  }
}
