'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let attr = lib.attr(params)
    let content = `<div class="modal${params.noFade ? '' : ' fade'}" ${attr} `
    content += `tabindex="-1" role="dialog" aria-hidden="true">\n`
    content += `<div class="modal-dialog${params.vcenter ? ' modal-dialog-centered' : ''} `
    if (params.size) content += ` modal-${params.size}`
    content += `" role="document">\n`
    content += `<div class="modal-content">\n`
    content += `<div class="modal-header">\n`
    content += `<h5 class="modal-title">${params.title || ''}</h5>\n`
    if (!params.noDismiss) {
      content += `<button type="button" class="close" data-dismiss="modal" aria-label="Close">\n`
      content += `<span aria-hidden="true">&times;</span>\n</button>\n`
    }
    content += `</div>\n<div class="modal-body">\n`
    content += `${params.content || ''}\n</div>\n`
    if (!params.noFooter) {
      content += `<div class="modal-footer">\n`
      if (!params.buttons) params.buttons = ['close']
      _.each(params.buttons, b => {
        if (_.isString(b)) {
          switch (b) {
            case 'close': b = { title: 'Close', context: 'secondary', data: { dismiss: 'modal' } }; break
            case 'ok': b = { title: 'OK', context: 'primary' }; break
            default: b = { title: b }
          }
        }
        if (b.triggerDismiss) _.set(b, 'data.dismiss', 'modal')
        content += cmpt('button', b)
      })
      content += `</div>\n`
    }
    content += `</div>\n</div>\n</div>\n`

    return content
  }
}
