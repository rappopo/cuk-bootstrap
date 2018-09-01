'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    if (_.isArray(params)) params = { buttons: params }
    let content = `<div class="btn-group${params.stacked ? '-vertical' : ''} `
    if (params.textSize) content += `btn-group-${params.textSize} `
    if (params.cls) content += `${params.cls}" `
    content += 'role="group" ' + lib.attr(params) + '>\n'
    _.each(params.buttons || [], b => {
      if (_.isPlainObject(b)) {
        content += cmpt('button', b, ctx)
      } else {
        content += b
      }
    })
    content += '</div>\n'
    return content
  }
}
