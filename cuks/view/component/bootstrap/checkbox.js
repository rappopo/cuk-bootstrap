'use strict'

module.exports = function (cuk) {
  const { _ } = cuk.pkg.core.lib
  const lib = require('../_lib')(cuk)

  return (params = {}, ctx) => {
    const cmpt = cuk.pkg.view.lib.cmpt(ctx)
    let content = ''
    if (params.custom && !params.id) params.custom = false
    if (!params.plain) {
      content += `<div class="${params.custom ? 'custom-control custom-checkbox' : 'form-check'} `
      if (params.inline) content += `${params.custom ? 'custom-control-inline' : 'form-check-inline'} `
      content += '">\n'
    }
    const items = ['seq', 'id', 'name', 'value', 'checked', 'style', 'rel', 'textSize', 'disabled', 'inputId', 'inputCls',
      'tt', 'ttDir', 'po', 'poDir', 'poTitle', 'poContainer', 'poNoDismiss']
    const input = lib.attrFromParent('input', params, items)
    input.type = 'checkbox'
    input.id = input.id || ('cmpt-checkbox-' + input.name + '-' + (input.seq || '0'))
    delete input.seq
    input.ariaLabel = params.label ? '...' : ''
    input.cls = params.label ? '' : 'position-static '
    if (!params.plain) input.cls += params.custom ? 'custom-control-input' : 'form-check-input'

    content += cmpt('input', input, ctx)

    if (params.label) {
      let label = _.isPlainObject(params.label) ? params.label : { content: params.label || '' }
      if (input.id) label.for = input.id
      if (!params.plain) {
        label.cls = (params.custom ? 'custom-control-label ' : 'form-check-label ') + (label.cls || '')
      }
      content += cmpt('label', label, ctx)
    }

    if (!params.plain) content += '</div>\n'
    return content
  }
}
